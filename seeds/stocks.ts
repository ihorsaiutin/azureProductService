const populateStocks = async (stocks) => {
  const key = process.env.COSMOS_KEY;
  const endpoint = process.env.COSMOS_ENDPOINT;

  const databaseName = "products-db";
  const containerName = "stocks";

  const { CosmosClient } = require("@azure/cosmos");
  const cosmosClient = new CosmosClient({ endpoint, key });

  const database = cosmosClient.database(databaseName);
  const container = database.container(containerName);
  await Promise.all(stocks.map((stock) => container.items.upsert(stock)));
};

module.exports = {
  populateStocks,
};
