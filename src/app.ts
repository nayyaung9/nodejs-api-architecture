import 'reflect-metadata';
import http from "http";
import express from "express";
import config from "./config";
import Logger from "@/loaders/logger";

(async () => {
  const app = express();
  const httpServer = http.createServer(app);

  await require("./loaders").default({ expressApp: app });
  httpServer
    .listen(config.port, () => {
      Logger.info(`My Server is listening on port: ${config.port}`);
    })
    .on("error", (err) => {
      process.exit(1);
    });
})();
