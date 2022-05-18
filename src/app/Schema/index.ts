import { model } from "mongoose";

import { IUser } from "./IUser";
import { userSchema } from "./UserSchema";

const User = model<IUser>("User", userSchema);

export { User };
