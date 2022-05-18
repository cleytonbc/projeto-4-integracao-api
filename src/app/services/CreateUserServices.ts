import { Users } from "../model/Users";

interface IRequest {
  name: string;
  email: string;
  password: string;
}
class CreateUserServices {
  async execute({ name, email, password }: IRequest): Promise<Users> {
    const user = new Users();

    Object.assign(user, {
      name,
      email,
      password,
    });

    return user;
  }
}

export { CreateUserServices };
