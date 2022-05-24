import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { UserRespository } from "../repositories/implements/UserRepository";
import { IUserRepository } from "../repositories/IUserRepository";

interface IResponse {
  name: string;
  email: string;
}

@injectable()
class ListProfileServices {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}
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
