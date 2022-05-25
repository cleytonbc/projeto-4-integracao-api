import { inject, injectable } from "tsyringe";
import { validCode } from "../../../shared/utils/validCode";
import { ITrackerRepository } from "../repository/ITrackerRepository";
import { ITracker } from "../schemas/ITracker";

@injectable()
class FindByUndeliverableTracker {
  constructor(
    @inject("TrackerRepository")
    private trackerRepository: ITrackerRepository,
  ) {}

  async execute(): Promise<ITracker[]> {
    const undeliverableTracker =
      await this.trackerRepository.findAllUndeliverable();

    const trackerValid = undeliverableTracker.filter(t => validCode(t.code));

    return trackerValid;
  }
}

export { FindByUndeliverableTracker };
