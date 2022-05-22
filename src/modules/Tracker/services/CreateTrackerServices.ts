import { AppError } from "../../../shared/errors/AppError";
import { ICreateTrackerDTO } from "../DTOS/ICreateTrackerDTO";
import { TrackerRepository } from "../repository/implements/TrackerRepository";
import { ITrackerRepository } from "../repository/ITrackerRepository";
import { ITracker } from "../schemas/ITracker";
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

class CreateTrackerService {
  private trackerRepository: ITrackerRepository;
  constructor() {
    this.trackerRepository = new TrackerRepository();
  }
  async execute(code: string, userId: string): Promise<IResponse> {
    const callApiTrackerServices = new CallApiTrackerServices();

    const codeExists = await this.trackerRepository.findByCode(code);

    if (codeExists) {
      throw new AppError("Já existe esse código cadastrado");
    }

    const tracking = await callApiTrackerServices.execute(code, userId);

    const { amount, service, isDelivery, events } =
      await this.trackerRepository.create({
        code: tracking.code,
        amount: tracking.amount,
        isDelivery: tracking.isDelivery,
        lastUpdate: tracking.lastUpdate,
        userId: tracking.userId,
        service: tracking.service,
        events: tracking.events,
      });

    return { code, amount, service, isDelivery, events };
  }
}
export { CreateTrackerService };
