import { ICreateTrackerDTO } from "../../DTOS/ICreateTrackerDTO";
import { IUpdateTrackerDTO } from "../../DTOS/IUpdateTrackerDTO";
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

  async findByCodeAndUser(code: string, userId: String): Promise<ITracker> {
    return Tracker.findOne({ code, userId });
  }

  async findByUser(userId: string): Promise<ITracker[]> {
    return Tracker.find({ userId });
  }

  async findById(id: string): Promise<ITracker> {
    return Tracker.findById(id);
  }

  async findAndUpdate({
    _id,
    code,
    amount,
    isDelivery,
    service,
    userId,
    lastUpdate,
    events,
  }: IUpdateTrackerDTO): Promise<ITracker> {
    return Tracker.findOneAndUpdate(
      { _id },
      { _id, code, amount, isDelivery, service, userId, lastUpdate, events },
      {
        new: true,
      },
    );
  }
  async delete(id: string): Promise<void> {
    await Tracker.findByIdAndDelete(id);
  }
}
export { TrackerRepository };
