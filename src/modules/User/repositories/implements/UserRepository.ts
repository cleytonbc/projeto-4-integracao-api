import { ICreateUserDTO } from "../../DTOS/ICreateUserDTO";
import { IUpdateUserDTO } from "../../DTOS/IUpdateUserDTO";
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
  async findAndUpdate({
    _id,
    name,
    email,
    password_hash,
  }: IUpdateUserDTO): Promise<IUser> {
    return User.findOneAndUpdate(
      { _id },
      { _id, name, email, password_hash },
      {
        new: true,
      },
    );
  }
  async findById(id: string): Promise<IUser> {
    return User.findById(id);
  }
}

export { UserRespository };
