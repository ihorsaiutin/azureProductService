import { appContainer } from "../inversify/container";
import { DatabaseConnection } from "./database-connection";
import { CONFIG } from "../config/di";
import { getExecutionContainer } from "../inversify/get-execution-context";
import { interfaces } from "inversify";
import ServiceIdentifier = interfaces.ServiceIdentifier;

// An example of handling the expensive object. You can then inject this class
// into any other classes that have more specific use-case, e.g. classes that operate with
// different entities in your database.

export const DB_CONNECTION: ServiceIdentifier<DatabaseConnection> =
  Symbol.for("DB_CONNECTION");

appContainer
  .bind(DB_CONNECTION)
  .toDynamicValue(async (context) => {
    const executionContainer = getExecutionContainer(context);

    // An example of resolving something
    const config = await executionContainer.getAsync(CONFIG);

    const databaseConnection = new DatabaseConnection(config);

    await databaseConnection.DBconnect();

    return databaseConnection;
  })
  // This plays key role in re-using the expensive object, in singleton scope means that
  // only one entity of such object is persistent across invocations to execution container.
  .inSingletonScope();
