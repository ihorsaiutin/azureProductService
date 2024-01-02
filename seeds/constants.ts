const { faker } = require("@faker-js/faker");

const PRODUCTS = Array.from({ length: 5 }).map(() => ({
  id: faker.string.uuid(),
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.number.int({ min: 1, max: 100_000_000 }),
}));

const STOCKS = PRODUCTS.map((product) => ({
  id: product.id,
  product_id: product.id,
  count: faker.number.int({ min: 1, max: 500 }),
}));

module.exports = { PRODUCTS, STOCKS };
