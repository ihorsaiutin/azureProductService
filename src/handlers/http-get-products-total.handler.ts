import { Context } from "@azure/functions";
import { injectable } from "inversify";

import { makeHandler } from "../common/inversify/make-handler";
import { BaseHandler } from "../common/handlers/base.handler";
import { Logger } from "../common/logger/logger";
import { ProductService } from "../modules/product/product.service";

@injectable()
export class HttpGetProductsTotalHandler extends BaseHandler {
  constructor(
    private readonly logger: Logger,
    private readonly productService: ProductService
  ) {
    super();
    this.logger.setClassContext(HttpGetProductsTotalHandler.name);
  }

  async executeFunction(context: Context): Promise<void> {
    try {
      this.logger.info("Processing HttpGetProductsTotalHandler request!");

      const total = await this.productService.getProductsTotal();

      context.res = {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
        body: total,
      };
    } catch (e) {
      this.logger.error(e);
      context.res = {
        status: 500,
      };
    }
  }
}

export const handler = makeHandler(HttpGetProductsTotalHandler);
