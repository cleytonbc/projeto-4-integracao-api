import { response } from "express";
import { AppError } from "../../../shared/errors/AppError";
import { ICriptografyPassword } from "../../../shared/providers/cryptography";
import { CriptografyPasswordBcrypt } from "../../../shared/providers/cryptography/implements/CriptografyPasswordBcrypt";
import { UserRespository } from "../repositories/implements/UserRepository";
import { IUserRepository } from "../repositories/IUserRepository";
import { IUser } from "../schemas/IUser";

interface IRequest {
  id: string;
  name: string;
  email: string;
  oldPassword: string;
  password?: string;
}

interface IResponse {
  name: string;
  email: string;
}

class UpdateProfileServices {
  private userRepository: IUserRepository;
  private criptografyPassword: ICriptografyPassword;
  constructor() {
    this.userRepository = new UserRespository();
    this.criptografyPassword = new CriptografyPasswordBcrypt();
  }
  async execute({
    id,
    name,
    email,
    oldPassword,
    password,
  }: IRequest): Promise<IResponse> {
    const userExists = await this.userRepository.findById(id);

    if (!userExists) {
      throw new AppError("Usuário não encontrado");
    }

    if (!oldPassword) {
      throw new AppError("Senha atual não informada");
    }

    const passwordCompare = await this.criptografyPassword.CompareHash(
      oldPassword,
      userExists.password_hash,
    );

    if (!passwordCompare) {
      throw new AppError("Senha atual inválida");
    }

    const userEmailExists = await this.userRepository.findEmail(email);

    if (userEmailExists && userEmailExists.email !== userExists.email) {
      throw new AppError("Já existe um usuário com esse e-mail");
    }

    let password_hash = userExists.password_hash;

    if (password) {
      password_hash = await this.criptografyPassword.Hash(password);
    }

    const user = await this.userRepository.findAndUpdate({
      _id: id,
      name,
      email,
      password_hash,
    });

    return { name: user.name, email: user.email };
  }
}

export { UpdateProfileServices };
