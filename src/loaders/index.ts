import expressLoader from "./express";
import databaseLoader from "./database";
import DILoader from "./DI";
import Logger from "./logger";

export default async ({ expressApp }) => {
  await databaseLoader();
  Logger.info("DB loaded and connected!");

  const models = [{ name: "userModel", model: require("@/models/User") }];

  await DILoader({ models });
  Logger.info("Dependency Injector loaded");

  await expressLoader({ app: expressApp });
  Logger.info("Express loaded");
};
