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

    const variables = {
      name,
      code,
    };

    const path = templatePath;
    const subject = "Atualização de encomenda";

    await this.mailProvider.sendMail(to, subject, variables, path);
  }
}

export { SendNotificationMail };