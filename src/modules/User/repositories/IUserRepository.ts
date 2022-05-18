import { ICreateUserDTO } from "../DTOS/ICreateUserDTO";
import { IUser } from "../schemas/IUser";
import { User } from "../schemas";

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<IUser>;
  findEmail(email: string): Promise<IUser>;
  update(id: string): Promise<IUser>;
}
