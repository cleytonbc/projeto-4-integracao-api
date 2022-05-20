import { AppError } from "../../../shared/errors/AppError";
import { ICriptografyPassword } from "../../../shared/providers/cryptography";
import { CriptografyPasswordBcrypt } from "../../../shared/providers/cryptography/implements/CriptografyPasswordBcrypt";
import { UserRespository } from "../repositories/implements/UserRepository";
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

class CreateUserServices {
  private criptografyPassword: ICriptografyPassword;
  constructor() {
    this.criptografyPassword = new CriptografyPasswordBcrypt();
  }
  async execute({ name, email, password }: IRequest): Promise<IResponse> {
    const userRespository = new UserRespository();

    const userEmailExists = await userRespository.findEmail(email);

    if (userEmailExists) {
      throw new AppError("Email já existente");
    }

    const password_hash = await this.criptografyPassword.Hash(password);

    userRespository.create({
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
