import { ICreateUserDTO } from "../../DTOS/ICreateUserDTO";
import { User } from "../../schemas";
import { IUser } from "../../schemas/IUser";
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
  async findById(id: string): Promise<IUser> {
    return User.findById(id);
  }
}

export { UserRespository };
