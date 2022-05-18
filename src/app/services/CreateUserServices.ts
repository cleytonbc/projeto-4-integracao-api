import { ICriptografyPassword } from "../cryptography";
import { CriptografyPasswordBcrypt } from "../cryptography/implements/CriptografyPasswordBcrypt";
import { Users } from "../model/Users";

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
  async execute({ name, email, password }: IRequest): Promise<Users> {
    const user = new Users();

    const password_hash = await this.criptografyPassword.Hash(password);

    Object.assign(user, {
      name,
      email,
      password_hash,
    });

    return user;
  }
}

export { CreateUserServices };
