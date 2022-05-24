import { inject, injectable } from "tsyringe";
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

@injectable()
class ListAllTrackerUserServices {
  constructor(
    @inject("TrackerRepository")
    private trackerRepository: ITrackerRepository,
  ) {}

  async execute(userId: string): Promise<IResponse[]> {
    const trackersUser = await this.trackerRepository.findByUser(userId);

    if (!trackersUser) {
      throw new AppError("Nenhum rastreio encontrado para esse usuário", 404);
    }
    const trackers = [];

    trackersUser.map(t => {
      const track = {
        code: t.code,
        amount: t.amount,
        service: t.service,
        isDelivery: t.isDelivery,
        events: t.events,
      };
      trackers.push(track);
    });

    return trackers;
  }
}

export { ListAllTrackerUserServices };
