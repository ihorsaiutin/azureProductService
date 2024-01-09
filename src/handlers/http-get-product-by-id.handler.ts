import { Context } from "@azure/functions";
import { injectable } from "inversify";

import { makeHandler } from "../common/inversify/make-handler";
import { BaseHandler } from "../common/handlers/base.handler";
import { Logger } from "../common/logger/logger";
import { ProductService } from "../modules/product/product.service";

@injectable()
export class HttpProductHandler extends BaseHandler {
  constructor(
    private readonly logger: Logger,
    private readonly productService: ProductService
  ) {
    super();
    this.logger.setClassContext(HttpProductHandler.name);
  }

  async executeFunction(context: Context): Promise<void> {
    try {
      this.logger.info("Processing HttpProductHandler request!");

      const { id } = context.bindingData;
      const product = await this.productService.getProduct(id);

      if (!product) {
        context.res = {
          status: 404,
        };
      } else {
        context.res = {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
          body: product,
        };
      }
    } catch (e) {
      this.logger.error(e);
      context.res = {
        status: 500,
      };
    }
  }
}

export const handler = makeHandler(HttpProductHandler);
