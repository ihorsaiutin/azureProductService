import { AzureFunction } from "@azure/functions";
import { makeHandler } from "../src/common/inversify/make-handler";
import { HttpProductHandler } from "../src/handlers/http-get-product-by-id.handler";

const httpTrigger: AzureFunction = makeHandler(HttpProductHandler);
export default httpTrigger;
