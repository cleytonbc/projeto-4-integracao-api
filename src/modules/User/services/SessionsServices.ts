import { AppError } from "../../../shared/errors/AppError";
import { ICriptografyPassword } from "../../../shared/providers/cryptography";
import { CriptografyPasswordBcrypt } from "../../../shared/providers/cryptography/implements/CriptografyPasswordBcrypt";
import { UserRespository } from "../repositories/implements/UserRepository";
import { IUserRepository } from "../repositories/IUserRepository";
import { User } from "../schemas";

interface IRequest {
  email: string;
  password: string;
}

class SessionsServices {
  private criptografyPassword: ICriptografyPassword;
  private userRepository: IUserRepository;
  constructor() {
    this.criptografyPassword = new CriptografyPasswordBcrypt();
    this.userRepository = new UserRespository();
  }

  async execute({ email, password }: IRequest) {
    const userExist = await this.userRepository.findEmail(email);

    if (!userExist) {
      throw new AppError("usuário ou senha inválida");
    }

    const comparePassword = await this.criptografyPassword.CompareHash(
      password,
      userExist.password_hash,
    );

    if (!comparePassword) {
      throw new AppError("usuário ou senha inválida");
    }

    return "login efetuado";
  }
}
export { SessionsServices };
