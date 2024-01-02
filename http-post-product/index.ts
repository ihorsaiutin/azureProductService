import { AzureFunction } from "@azure/functions";
import { makeHandler } from "../src/common/inversify/make-handler";
import { HttpPostProductHandler } from "../src/handlers/http-post-product.handler";

const httpTrigger: AzureFunction = makeHandler(HttpPostProductHandler);
export default httpTrigger;
