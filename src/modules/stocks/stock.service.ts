import { injectable } from "inversify";

import { Logger } from "../../common/logger/logger";
import { StockDatabase } from "../../database/stock.db";
import { Stock } from "../../common/types";

@injectable()
export class StockService {
  constructor(
    private readonly logger: Logger,
    private readonly database: StockDatabase
  ) {
    this.logger.setClassContext(StockService.name);
  }

  async getStocks() {
    this.logger.info("Get stocks");
    return this.database.getStocks();
  }

  async getStock(productId: string) {
    this.logger.info("Get stock by ID", productId);
    return this.database.getStock(productId);
  }

  async createStock(data: Stock) {
    this.logger.info("Create stock", data);
    return this.database.createStock(data);
  }

  async getStocksTotal() {
    this.logger.info("Get stocks total");
    return this.database.getStocksTotal();
  }
}
