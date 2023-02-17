import { IUser } from "@/interfaces/IUser";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
  },

  { timestamps: true }
);

UserSchema.set("toJSON", {
  versionKey: false,
});

module.exports = mongoose.model<IUser & mongoose.Document>("User", UserSchema);
