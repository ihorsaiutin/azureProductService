import { Container } from "@azure/cosmos";
import { inject, injectable } from "inversify";

import { DatabaseConnection } from "../common/expensive-object/database-connection";
import { DB_CONNECTION } from "../common/expensive-object/di";
import { NewProduct, Product } from "../common/types";

const DATABASE_NAME = "products-db";
const CONTAINER_NAME = "products";

@injectable()
export class ProductDatabase {
  constructor(
    @inject(DB_CONNECTION)
    private readonly databaseConnection: DatabaseConnection
  ) {
    const databaseClient = this.databaseConnection.getDBClient();
    const database = databaseClient.database(DATABASE_NAME);
    const container = database.container(CONTAINER_NAME);
    this.databaseContainer = container;
  }

  private readonly databaseContainer: Container;

  async getProducts(): Promise<Product[]> {
    const querySpec = {
      query: `SELECT VALUE {
        id: c.id,
        title: c.title,
        description: c.description,
        price: c.price
      } FROM c`,
    };
    const { resources } = await this.databaseContainer.items
      .query(querySpec)
      .fetchAll();
    return resources;
  }

  async getProduct(productId: string): Promise<Product> {
    const querySpec = {
      query: `SELECT VALUE {
        id: c.id,
        title: c.title,
        description: c.description,
        price: c.price
      } FROM c WHERE c.id = "${productId}"`,
    };
    const { resources } = await this.databaseContainer.items
      .query(querySpec)
      .fetchAll();
    return resources[0];
  }

  async createProduct(data: NewProduct): Promise<Product> {
    const { item } = await this.databaseContainer.items.upsert({ ...data });
    return item as unknown as Product;
  }
}
