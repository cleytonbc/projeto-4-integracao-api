import { container } from "tsyringe";
import { TrackerRepository } from "../../../modules/Tracker/repository/implements/TrackerRepository";
import { ITracker } from "../../../modules/Tracker/schemas/ITracker";
import { CallApiTrackerJobServices } from "../../../modules/Tracker/services/CallApiTrackerJobServices";
import { FindByUndeliverableTracker } from "../../../modules/Tracker/services/FindByUndeliverableTracker";

export default {
  key: "UpdateNewTracker",
  options: {},
  async handle({ data }) {
    const { code, userId, id } = data;

    const callApiTracker = new CallApiTrackerJobServices();

    const tracker = await callApiTracker.execute(code, userId);
    const trackerRepository = new TrackerRepository();

    await trackerRepository.findAndUpdate({
      _id: id,
      code: tracker.code,
      amount: tracker.amount,
      isDelivery: tracker.isDelivery,
      lastUpdate: tracker.lastUpdate,
      userId: tracker.userId,
      service: tracker.service,
      events: tracker.events,
    });
  },
};
