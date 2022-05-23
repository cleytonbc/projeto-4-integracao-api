import { AppError } from "../../../shared/errors/AppError";
import { validCode } from "../../../shared/utils/validCode";
import { TrackerRepository } from "../repository/implements/TrackerRepository";
import { ITrackerRepository } from "../repository/ITrackerRepository";
import { ITracker } from "../schemas/ITracker";
import { CallApiTrackerServices } from "./CallApiTrackerServices";

class EditTrackerService {
  private trackerRepository: ITrackerRepository;
  constructor() {
    this.trackerRepository = new TrackerRepository();
  }
  async execute(id: string, code: string, userId: string) {
    const codeFomartIsValid = validCode(code);

    if (!codeFomartIsValid) {
      throw new AppError("O formato do código não é válido, favor verificar");
    }

    const trackerExists = await this.trackerRepository.findById(id);

    if (!trackerExists) {
      throw new AppError("Código não cadastrado para esse usuário");
    }

    if (code === trackerExists.code) {
      throw new AppError("Código informado é o mesmo já cadastrado");
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

    const { amount, isDelivery, service, lastUpdate, events } =
      await callApiTrackerServices.execute(code, userId);

    const newTrack = await this.trackerRepository.findAndUpdate({
      _id: trackerExists._id,
      code,
      amount,
      isDelivery,
      service,
      userId,
      lastUpdate,
      events,
    });

    return newTrack;
  }
}

export { EditTrackerService };
