import { AppError } from "../../../shared/errors/AppError";
import { TrackerRepository } from "../repository/implements/TrackerRepository";
import { ITrackerRepository } from "../repository/ITrackerRepository";

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

class ListTrackerCodeServices {
  private trackerRepository: ITrackerRepository;
  constructor() {
    this.trackerRepository = new TrackerRepository();
  }
  async execute(code: string, userId: string): Promise<IResponse> {
    const trackersUser = await this.trackerRepository.findByCodeAndUser(
      code,
      userId,
    );

    if (!trackersUser || trackersUser.userId !== userId) {
      throw new AppError("Código não cadastrado para esse usuário ");
    }

    const tracker = {
      code: trackersUser.code,
      amount: trackersUser.amount,
      service: trackersUser.service,
      isDelivery: trackersUser.isDelivery,
      events: trackersUser.events,
    };

    return tracker;
  }
}

export { ListTrackerCodeServices };
