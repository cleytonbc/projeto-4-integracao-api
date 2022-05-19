import { AppError } from "../../../shared/errors/AppError";
import { UserRespository } from "../repositories/implements/UserRepository";
import { IUserRepository } from "../repositories/IUserRepository";

interface IResponse {
  name: string;
  email: string;
}

class ListProfileServices {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRespository();
  }
  async execute(id: string): Promise<IResponse> {
    const userExist = await this.userRepository.findById(id);

    if (!userExist) {
      throw new AppError("Usuário não encontrado");
    }

    return {
      name: userExist.name,
      email: userExist.email,
    };
  }
}

export { ListProfileServices };
