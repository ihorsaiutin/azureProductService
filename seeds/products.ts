const populateProducts = async (products) => {
  const key = process.env.COSMOS_KEY;
  const endpoint = process.env.COSMOS_ENDPOINT;

  const databaseName = "products-db";
  const containerName = "products";

  const { CosmosClient } = require("@azure/cosmos");
  const cosmosClient = new CosmosClient({ endpoint, key });

  const database = cosmosClient.database(databaseName);
  const container = database.container(containerName);
  await Promise.all(products.map((product) => container.items.upsert(product)));
};

module.exports = { populateProducts };
