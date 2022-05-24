import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { ICriptografyPassword } from "../../../shared/providers/cryptography";
import { CriptografyPasswordBcrypt } from "../../../shared/providers/cryptography/implements/CriptografyPasswordBcrypt";
import { UserRespository } from "../repositories/implements/UserRepository";
import { IUserRepository } from "../repositories/IUserRepository";
import { IUser } from "../schemas/IUser";

interface IRequest {
  name: string;
  email: string;
  password: string;
}
interface IResponse {
  name: string;
  email: string;
}

@injectable()
class CreateUserServices {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("CriptografyPasswordBcrypt")
    private criptografyPassword: ICriptografyPassword,
  ) {}

  async execute({ name, email, password }: IRequest): Promise<IResponse> {
    const userEmailExists = await this.userRepository.findEmail(email);

    if (userEmailExists) {
      throw new AppError("Email já existente");
    }

    const password_hash = await this.criptografyPassword.Hash(password);

    this.userRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      name,
      email,
    };
  }
}

export { CreateUserServices };
