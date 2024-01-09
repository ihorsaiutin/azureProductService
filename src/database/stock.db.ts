import { Container } from "@azure/cosmos";
import { inject, injectable } from "inversify";

import { DatabaseConnection } from "../common/expensive-object/database-connection";
import { DB_CONNECTION } from "../common/expensive-object/di";
import { Stock } from "../common/types";

const DATABASE_NAME = "products-db";
const CONTAINER_NAME = "stocks";

@injectable()
export class StockDatabase {
  constructor(
    @inject(DB_CONNECTION)
    private readonly databaseConnection: DatabaseConnection
  ) {
    const dbClient = this.databaseConnection.getDBClient();
    const database = dbClient.database(DATABASE_NAME);
    const container = database.container(CONTAINER_NAME);
    this.databaseContainer = container;
  }

  private readonly databaseContainer: Container;

  async getStocks(): Promise<Stock[]> {
    const querySpec = {
      query: `SELECT VALUE {
        product_id: c.product_id,
        count: c.count
      } FROM c`,
    };
    const { resources } = await this.databaseContainer.items
      .query(querySpec)
      .fetchAll();
    return resources;
  }

  async getStock(productId: string): Promise<Stock> {
    const querySpec = {
      query: `SELECT VALUE {
        product_id: c.product_id,
        count: c.count
      } FROM c WHERE c.id = "${productId}"`,
    };
    const { resources } = await this.databaseContainer.items
      .query(querySpec)
      .fetchAll();
    return resources[0];
  }

  async createStock(data: Stock): Promise<Stock> {
    const { item } = await this.databaseContainer.items.upsert({
      ...data,
      id: data.product_id,
    });
    return item as unknown as Stock;
  }

  async getStocksTotal(): Promise<number> {
    const querySpec = {
      query: `SELECT VALUE SUM(c.count) FROM c`,
    };
    const { resources } = await this.databaseContainer.items
      .query(querySpec)
      .fetchAll();
    return resources[0];
  }
}
