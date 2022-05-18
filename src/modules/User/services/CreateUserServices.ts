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
class CreateUserServices {
  private criptografyPassword: ICriptografyPassword;
  constructor() {
    this.criptografyPassword = new CriptografyPasswordBcrypt();
  }
  async execute({ name, email, password }: IRequest): Promise<IUser> {
    const userRespository = new UserRespository();

    const userEmailExists = await userRespository.findEmail(email);

    if (userEmailExists) {
      throw new AppError("Email já existente");
    }

    const password_hash = await this.criptografyPassword.Hash(password);

    const user = userRespository.create({
      name,
      email,
      password_hash,
    });

    return user;
  }
}

export { CreateUserServices };
