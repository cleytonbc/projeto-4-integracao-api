import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import queue from "../../../shared/jobs/queue";
import { validCode } from "../../../shared/utils/validCode";
import { ITrackerRepository } from "../repository/ITrackerRepository";
import { CallApiTrackerServices } from "./CallApiTrackerServices";

interface IResponse {
  code: string;
  amount: number;
  isDelivery: boolean;
  service: string;
  events: {
    date?: string;
    hour?: string;
    locality?: string;
    status?: string;
    subStatus?: object;
  }[];
}

@injectable()
class CreateTrackerService {
  constructor(
    @inject("TrackerRepository")
    private trackerRepository: ITrackerRepository,
  ) {}

  async execute(code: string, userId: string): Promise<void> {
    const codeIsValid = validCode(code);

    if (!codeIsValid) {
      throw new AppError("Código de rastreio inválido");
    }

    const codeExists = await this.trackerRepository.findByCodeAndUser(
      code,
      userId,
    );

    if (codeExists) {
      throw new AppError("Já existe esse código cadastrado");
    }

    const { _id } = await this.trackerRepository.create({
      code: code,
      amount: 0,
      isDelivery: false,
      lastUpdate: new Date(1900, 1, 1),
      userId: userId,
      service: "",
      events: {},
    });

    await queue.add("UpdateNewTracker", { code, userId, id: _id });
  }
}
export { CreateTrackerService };
