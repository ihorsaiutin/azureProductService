import { Context } from "@azure/functions";
import { injectable } from "inversify";

import { makeHandler } from "../common/inversify/make-handler";
import { BaseHandler } from "../common/handlers/base.handler";
import { Logger } from "../common/logger/logger";
import { ProductService } from "../modules/product/product.service";
import { validate } from "class-validator";
import { Product } from "./validators/product";
import { NewUserProduct } from "../common/types";

@injectable()
export class HttpPostProductHandler extends BaseHandler {
  constructor(
    private readonly logger: Logger,
    private readonly productService: ProductService
  ) {
    super();
    this.logger.setClassContext(HttpPostProductHandler.name);
  }

  async executeFunction(context: Context): Promise<void> {
    try {
      this.logger.info("Processing HttpPostProductHandler request!");

      const data = context.req.body;

      const errors = await this.validateProduct(data);
      if (errors.length !== 0) {
        context.res = {
          status: 400,
          headers: {
            "content-type": "application/json",
          },
          body: errors,
        };
        return;
      }

      const product = await this.productService.createProduct(data);

      context.res = {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
        body: product,
      };
    } catch (e) {
      this.logger.error(e);
      context.res = {
        status: 500,
      };
    }
  }

  async validateProduct(data: NewUserProduct) {
    const newProduct = new Product();
    newProduct.title = data.title;
    newProduct.description = data.description;
    newProduct.price = data.price;
    newProduct.count = data.count;
    const errors = await validate(newProduct, {
      skipMissingProperties: false,
      validationError: { target: false },
    });
    return errors;
  }
}

export const handler = makeHandler(HttpPostProductHandler);
