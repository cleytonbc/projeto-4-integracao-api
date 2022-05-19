import { ICreateUserDTO } from "../DTOS/ICreateUserDTO";
import { IUser } from "../schemas/IUser";
import { User } from "../schemas";
import { IUpdateUserDTO } from "../DTOS/IUpdateUserDTO";

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<IUser>;
  findEmail(email: string): Promise<IUser>;
  findAndUpdate(data: IUpdateUserDTO): Promise<IUser>;
  findById(id: string): Promise<IUser>;
}
