import { container } from "tsyringe";
import { SendNotificationMail } from "../../../modules/Tracker/services/SendNotificationMail";

export default {
  key: "SendMailNotification",
  options: {},
  async handle({ data }) {
    const { userId, code } = data;

    const sendNotificationMail = container.resolve(SendNotificationMail);
    await sendNotificationMail.execute(userId, code);
    console.log("enviando e-mail para o ", code);
  },
};
