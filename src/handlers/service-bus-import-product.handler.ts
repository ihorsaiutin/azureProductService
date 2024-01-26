import { Context } from "@azure/functions";
import { injectable } from "inversify";

import { makeHandler } from "../common/inversify/make-handler";
import { BaseHandler } from "../common/handlers/base.handler";
import { Logger } from "../common/logger/logger";
import { ProductService } from "../modules/product/product.service";
import { NewUserProduct } from "../common/types";
import { validateProduct } from "./utils/validateProduct";

@injectable()
export class ServiceBusImportProductHandler extends BaseHandler {
  constructor(
    private readonly logger: Logger,
    private readonly productService: ProductService
  ) {
    super();
    this.logger.setClassContext(ServiceBusImportProductHandler.name);
  }

  async executeFunction(
    context: Context,
    serviceBusItem: string
  ): Promise<void> {
    try {
      this.logger.info("Processing ServiceBusImportProductHandler request!");

      const products: NewUserProduct[] = JSON.parse(serviceBusItem);

      const errors = await Promise.all(
        products.map((product) => validateProduct(product))
      );
      if (errors.filter(Boolean).length !== 0) {
        context.res = {
          status: 400,
          headers: {
            "content-type": "application/json",
          },
          body: errors,
        };
        return;
      }

      await Promise.all(
        products.map((product) => this.productService.createProduct(product))
      );

      context.res = {
        status: 200,
      };
    } catch (e) {
      this.logger.error(e);
      context.res = {
        status: 500,
      };
    }
  }
}

export const handler = makeHandler(ServiceBusImportProductHandler);
