import { injectable } from "inversify";

import { Logger } from "../../common/logger/logger";
import { ProductDatabase } from "../../database/product.db";
import { NewProduct, NewUserProduct, UserProduct } from "../../common/types";
import { StockService } from "../stocks/stock.service";

@injectable()
export class ProductService {
  constructor(
    private readonly logger: Logger,
    private readonly database: ProductDatabase,
    private readonly stockService: StockService
  ) {
    this.logger.setClassContext(ProductService.name);
  }

  async getProducts(): Promise<UserProduct[]> {
    this.logger.info("Get products");

    const products = await this.database.getProducts();
    const stocks = await this.stockService.getStocks();

    const productsWithCount = products.map((product) => ({
      ...product,
      count:
        stocks.find((stock) => stock.product_id === product.id)?.count || 0,
    }));
    return productsWithCount;
  }

  async getProduct(productId: string): Promise<UserProduct> {
    this.logger.info("Get product by ID", productId);

    const product = await this.database.getProduct(productId);
    const stock = await this.stockService.getStock(productId);
    return { ...product, count: stock.count || 0 };
  }

  async createProduct(data: NewUserProduct) {
    this.logger.info("Create product", data);

    const { count, ...productData } = data;
    const { id } = await this.database.createProduct(productData);
    await this.stockService.createStock({
      count,
      product_id: id,
    });
    return { ...data, id };
  }

  async getProductsTotal() {
    this.logger.info("Get products total");
    return this.stockService.getStocksTotal();
  }
}
