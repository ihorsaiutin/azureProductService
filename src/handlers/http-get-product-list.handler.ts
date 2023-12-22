import { injectable } from "inversify";
import { makeHandler } from "../common/inversify/make-handler";
import { Context } from "@azure/functions";
import { BaseHandler } from "../common/handlers/base.handler";
import { Logger } from "../common/logger/logger";
import { ProductService } from "../modules/product/product.service";

@injectable()
export class HttpProductListHandler extends BaseHandler {
  constructor(
    private readonly logger: Logger,
    private readonly productService: ProductService
  ) {
    super();
    this.logger.setClassContext(HttpProductListHandler.name);
  }

  async executeFunction(context: Context): Promise<void> {
    try {
      this.logger.info("Processing HttpProductListHandler request!");

      const products = await this.productService.getProducts();

      context.res = {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
        body: products,
      };
    } catch (e) {
      this.logger.error(e);
      context.res = {
        status: 500,
      };
    }
  }
}

export const handler = makeHandler(HttpProductListHandler);
