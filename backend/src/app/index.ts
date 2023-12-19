import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

import DBConnector from "./db-connector";
import Config from "./config";
import { appRouter } from "./api";

const app = express();

const connectDatabases = async () => {
  await DBConnector.connectMongo(Config.MONGO_URL + Config.FASHION_CLOUD_DB);
};

const addBodyParser = async () => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
};

const initializeRouter = (r: express.Router) => {
  app.use("/", r);
};

const listenPort = (PORT) => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
};

const enableCors = (domains: string) => {
  app.use(cors());
};
async function start() {
  await connectDatabases();
  await addBodyParser();
  initializeRouter(appRouter);
  enableCors("*");
  await listenPort(Config.SERVICE_PORT);
}

export default {
  start,
};
