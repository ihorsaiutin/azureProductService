import { validate } from "class-validator";
import { Product } from "../validators/product";
import { NewUserProduct } from "../../common/types";

export async function validateProduct(data: NewUserProduct) {
  const newProduct = new Product();
  newProduct.title = data.title;
  newProduct.description = data.description;
  newProduct.price = data.price;
  newProduct.count = data.count;
  const errors = await validate(newProduct, {
    skipMissingProperties: false,
    validationError: { target: false },
  });
  return errors;
}
