import { ICreateTrackerDTO } from "../../DTOS/ICreateTrackerDTO";
import { Tracker } from "../../schemas";
import { ITracker } from "../../schemas/ITracker";
import { ITrackerRepository } from "../ITrackerRepository";

class TrackerRepository implements ITrackerRepository {
  async create({
    code,
    service,
    amount,
    isDelivery,
    lastUpdate,
    userId,
    events,
  }: ICreateTrackerDTO): Promise<ITracker> {
    const tracker = new Tracker({
      code,
      service,
      amount,
      isDelivery,
      lastUpdate,
      userId,
      events,
    });

    await tracker.save();

    return tracker;
  }
  async findByCode(code: string): Promise<ITracker> {
    return Tracker.findOne({ code });
  }
  findByUser(userId: string): Promise<ITracker[]> {
    throw new Error("Method not implemented.");
  }
}
export { TrackerRepository };
