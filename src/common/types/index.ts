export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}

export interface Stock {
  product_id: string;
  count: number;
}

export interface NewProduct extends Omit<Product, "id"> {}

export interface NewUserProduct extends NewProduct, Pick<Stock, "count"> {}

export interface UserProduct extends Product, Pick<Stock, "count"> {}
