import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  email: string;
}

export interface IUserInputDTO {
  email: string;
}
