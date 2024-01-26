import { AzureFunction } from "@azure/functions";

import { makeHandler } from "../src/common/inversify/make-handler";
import { ServiceBusImportProductHandler } from "../src/handlers/service-bus-import-product.handler";

const serviceBusQueueTrigger: AzureFunction = makeHandler(
  ServiceBusImportProductHandler
);
export default serviceBusQueueTrigger;
