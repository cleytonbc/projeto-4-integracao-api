import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import Queue from "../../../shared/jobs/queue";
import { validCode } from "../../../shared/utils/validCode";
import { TrackerRepository } from "../repository/implements/TrackerRepository";
import { ITrackerRepository } from "../repository/ITrackerRepository";
import { ITracker } from "../schemas/ITracker";
import { CallApiTrackerServices } from "./CallApiTrackerServices";

@injectable()
class EditTrackerService {
  constructor(
    @inject("TrackerRepository")
    private trackerRepository: ITrackerRepository,
  ) {}

  async execute(
    id: string,
    code: string,
    description: string,
    userId: string,
  ): Promise<void> {
    const trackerExists = await this.trackerRepository.findById(id);

    if (!trackerExists) {
      throw new AppError("Código não cadastrado para esse usuário");
    }

    const codeFomartIsValid = validCode(code);

    if (!codeFomartIsValid) {
      throw new AppError("O formato do código não é válido, favor verificar");
    }

    if (code === trackerExists.code) {
      await this.trackerRepository.findAndUpdate({
        _id: trackerExists._id,
        description,
        code: trackerExists.code,
        amount: trackerExists.amount,
        isDelivery: trackerExists.isDelivery,
        service: trackerExists.service,
        userId: trackerExists.userId,
        lastUpdate: trackerExists.lastUpdate,
        events: trackerExists.events,
      });
      return;
    }

    const trackerAlreadyExists = await this.trackerRepository.findByCodeAndUser(
      code,
      userId,
    );

    if (
      trackerAlreadyExists &&
      trackerAlreadyExists._id !== trackerExists._id
    ) {
      throw new AppError("Já existe o código cadstrado para esse usuário");
    }

    const callApiTrackerServices = new CallApiTrackerServices();

    await this.trackerRepository.findAndUpdate({
      _id: trackerExists._id,
      description,
      code,
      amount: 0,
      isDelivery: false,
      service: "",
      userId,
      lastUpdate: new Date(1909, 1, 1),
      events: {},
    });

    await Queue.add("UpdateNewTracker", {
      code,
      userId,
      description,
      id: trackerExists._id,
    });
    return;
  }
}

export { EditTrackerService };
