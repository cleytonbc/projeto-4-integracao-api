import { ICreateUserDTO } from "../../DTOS/ICreateUserDTO";
import { Users } from "../../model/Users";
import { User } from "../../Schema";
import { IUser } from "../../Schema/IUser";
import { IUserRepository } from "../IUserRepository";

class UserRespository implements IUserRepository {
  async create({
    _id,
    email,
    name,
    password_hash,
  }: ICreateUserDTO): Promise<IUser> {
    const user = new User({
      name,
      email,
      password_hash,
    });

    await user.save();

    return user;
  }
  async findEmail(email: string): Promise<IUser> {
    return User.findOne({ email });
  }
  update(id: string): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
}

export { UserRespository };
