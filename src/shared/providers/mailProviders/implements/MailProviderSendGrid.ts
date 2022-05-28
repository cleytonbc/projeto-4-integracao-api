import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";
import fs from "fs";
import handlebars from "handlebars";
import { IMailProvider } from "../IMailProvider";

@injectable()
class MailProviderSendGrid implements IMailProvider {
  private client: Transporter;
  constructor() {
    this.client = nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string,
  ): Promise<void> {
    console.log(to, subject, variables, path);
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail(
      {
        to,
        from: process.env.EMAIL_TO,
        subject,
        html: templateHTML,
      },

      function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log("Message sent: " + info.response);
        }
      },
    );
  }
}

export { MailProviderSendGrid };
