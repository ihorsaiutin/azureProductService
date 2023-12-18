import { inject, injectable } from "inversify";
import { Logger } from "../../common/logger/logger";
import { ClassForFactoryServiceFactory } from "../../common/execution-context-aware-factory/types";
import { CLASS_FACTORY } from "../../common/execution-context-aware-factory/di";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
};

const products: Product[] = [
  {
    id: "test-id-1",
    title: "Test Product 1",
    description: "some description for Test Product 1",
    price: 80_000,
  },
  {
    id: "test-id-2",
    title: "Test Product 2",
    description: "some description for Test Product 2",
    price: 80_000,
  },
  {
    id: "test-id-3",
    title: "Test Product 3",
    description: "some description for Test Product 3",
    price: 80_000,
  },
  {
    id: "test-id-4",
    title: "Test Product 4",
    description: "some description for Test Product 4",
    price: 80_000,
  },
  {
    id: "test-id-5",
    title: "Test Product 5",
    description: "some description for Test Product 5",
    price: 80_000,
  },
];

@injectable()
export class ProductService {
  constructor(
    private readonly logger: Logger,
    @inject(CLASS_FACTORY)
    private readonly factory: ClassForFactoryServiceFactory
  ) {
    this.logger.setClassContext(ProductService.name);
  }

  async getProducts() {
    this.logger.info("Get products");
    return products;
  }

  async getProduct(productId) {
    this.logger.info("Get product by ID");
    return products.find(({ id }) => id === productId);
  }
}
