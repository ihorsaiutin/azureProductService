import { AzureFunction } from "@azure/functions";
import { makeHandler } from "../src/common/inversify/make-handler";
import { HttpGetProductsTotalHandler } from "../src/handlers/http-get-products-total.handler";

const httpTrigger: AzureFunction = makeHandler(HttpGetProductsTotalHandler);
export default httpTrigger;
