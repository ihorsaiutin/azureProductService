const initDB = async () => {
  require("dotenv").config();
  const { PRODUCTS, STOCKS } = require("./constants.ts");
  const { populateProducts } = require("./products.ts");
  const { populateStocks } = require("./stocks.ts");

  await populateProducts(PRODUCTS);
  await populateStocks(STOCKS);
};

initDB();
