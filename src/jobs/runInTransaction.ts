import mongoose from "mongoose";
import Logger from "@/loaders/logger";

module.exports = async (callback) => {
  const session = await mongoose.startSession();
  Logger.info("DB Transaction Started");
  session.startTransaction();

  try {
    const result = await callback(session);

    Logger.info("DB Commited");
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();

    Logger.info("DB Aborted");

    throw error;
  } finally {
    session.endSession();
  }
};
