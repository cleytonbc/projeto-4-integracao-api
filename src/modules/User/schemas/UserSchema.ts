import { Schema } from "mongoose";
import { v4 as uuidV4 } from "uuid";
import { IUser } from "./IUser";

const userSchema = new Schema<IUser>({
  _id: { type: String, default: uuidV4 },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password_hash: { type: String, required: true },
});

export { userSchema };
