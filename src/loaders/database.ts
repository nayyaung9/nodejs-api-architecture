import mongoose, { connect } from "mongoose";
import config from "@/config";

export default async function run() {
  mongoose.set("strictQuery", false);
  await connect(config.databaseURL);
}
