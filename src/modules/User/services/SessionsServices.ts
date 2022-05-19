import { sign } from "jsonwebtoken";
import auth from "../../../config/auth";
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

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

class SessionsServices {
  private criptografyPassword: ICriptografyPassword;
  private userRepository: IUserRepository;
  constructor() {
    this.criptografyPassword = new CriptografyPasswordBcrypt();
    this.userRepository = new UserRespository();
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const userExist = await this.userRepository.findEmail(email);

    const { secret_token, expiresIn } = auth;

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

    const token = sign({}, secret_token, {
      subject: userExist._id,
      expiresIn,
    });

    return {
      user: {
        name: userExist.name,
        email: userExist.email,
      },
      token,
    };
  }
}
export { SessionsServices };
