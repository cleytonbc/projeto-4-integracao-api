import { container } from "tsyringe";
import { TrackerRepository } from "../../../modules/Tracker/repository/implements/TrackerRepository";
import { ITracker } from "../../../modules/Tracker/schemas/ITracker";
import { CallApiTrackerJobServices } from "../../../modules/Tracker/services/CallApiTrackerJobServices";
import { FindByUndeliverableTracker } from "../../../modules/Tracker/services/FindByUndeliverableTracker";
import { SendNotificationMail } from "../../../modules/Tracker/services/SendNotificationMail";
import { compareDate } from "../../utils/compareDate";
import { convertDateStrAndHouStr } from "../../utils/convertDate";
import Queue from "../queue";

export default {
  key: "UpdateTrackers",
  options: {
    repeat: { cron: "*/1 * * * *" },
  },
  async handle({ data }) {
    const trackerRepository = new TrackerRepository();
    const findByUndeliverableTracker = container.resolve(
      FindByUndeliverableTracker,
    );
    const sendNotificationMail = container.resolve(SendNotificationMail);

    const undeliverableTracker = await findByUndeliverableTracker.execute();

    const callApiTracker = new CallApiTrackerJobServices();

    const trackerResponse: ITracker[] = await Promise.all(
      undeliverableTracker.map(async (t): Promise<ITracker> => {
        let tracker = await callApiTracker.execute(t.code, t.userId);

        if (t._id) {
          tracker = { _id: t._id, ...tracker };
        }
        return tracker;
      }),
    );

    await Promise.all(
      trackerResponse.map(async (tracking): Promise<void> => {
        const actualTrack = undeliverableTracker.find(
          t => t._id === tracking._id,
        );

        const outdatedTraking =
          compareDate(tracking.lastUpdate, actualTrack.lastUpdate) &&
          actualTrack.events.length > 0;

        if (outdatedTraking) {
          const { userId, code } = await trackerRepository.findAndUpdate({
            _id: tracking._id,
            code: tracking.code,
            amount: tracking.amount,
            isDelivery: tracking.isDelivery,
            lastUpdate: tracking.lastUpdate,
            userId: tracking.userId,
            service: tracking.service,
            events: tracking.events,
          });

          await Queue.add("SendMailNotification", { userId, code });
        }
      }),
    );
  },
};
