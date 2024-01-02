import { CosmosClient } from "@azure/cosmos";

import { Config } from "../config/types";
import { inject } from "inversify";
import { CONFIG } from "../config/di";


export class DatabaseConnection {
  constructor(@inject(CONFIG) private readonly config: Config) {}
  private DBClient: CosmosClient;

  DBconnect() {
    const { db_endpoint, db_key } = this.config;
    const cosmosClient = new CosmosClient({
      endpoint: db_endpoint,
      key: db_key,
    });

    this.DBClient = cosmosClient;
  }

  getDBClient() {
    return this.DBClient;
  }
}
