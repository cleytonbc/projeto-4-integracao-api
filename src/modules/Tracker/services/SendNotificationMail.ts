import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { IMailProvider } from "../../../shared/providers/mailProviders/IMailProvider";
import Queue from "../../../shared/jobs/queue";
import { IUserRepository } from "../../User/repositories/IUserRepository";
import { ITrackerRepository } from "../repository/ITrackerRepository";

@injectable()
class SendNotificationMail {
  constructor(
    @inject("MailProvider")
    private mailProvider: IMailProvider,
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("TrackerRepository")
    private trackerRepository: ITrackerRepository,
  ) {}

  async execute(userId: string, code: string) {
    const { email: to, name } = await this.userRepository.findById(userId);
    const templatePath = resolve(
      __dirname,
      "..",
      "views",
      "emails",
      "UpdatedTracker.hbs",
    );
    const { description, events } =
      await this.trackerRepository.findByCodeAndUser(code, userId);

    const variables = {
      name,
      code,
      description,
      locality: events[0].locality,
      status: events[0].status,
      subStatus: events[0].subStatus,
    };

    const path = templatePath;
    const subject = "RastreioApp - Atualização de encomenda";

    await this.mailProvider.sendMail(to, subject, variables, path);
  }
}

export { SendNotificationMail };
