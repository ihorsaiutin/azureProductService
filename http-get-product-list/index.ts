import { AzureFunction } from "@azure/functions";
import { makeHandler } from "../src/common/inversify/make-handler";
import { HttpProductListHandler } from "../src/handlers/http-get-product-list.handler";

const httpTrigger: AzureFunction = makeHandler(HttpProductListHandler);
export default httpTrigger;
