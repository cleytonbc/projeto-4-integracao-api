import { ICreateUserDTO } from "../DTOS/ICreateUserDTO";
import { IUser } from "../Schema/IUser";
import { User } from "../Schema";

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<IUser>;
  findEmail(email: string): Promise<IUser>;
  update(id: string): Promise<IUser>;
}
