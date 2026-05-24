const nodemailer = require("nodemailer")
const { SMTPConfig } = require("../config/app.config")

class MailService {
  #transport

  // smtp server connect 
  constructor() {
    try {
      this.#transport = nodemailer.createTransport({
        host: SMTPConfig.host,
        port: SMTPConfig.port,
        service: SMTPConfig.provider,     // gmail, 
        auth: {
          user: SMTPConfig.user,
          pass: SMTPConfig.password
        }
      })
      console.log("**** SMTP Server connected *****")
    } catch(exception) {
      // console.error(exception)
      console.error("**** ERROR while connecting SMTP Server ****")
      throw {code: 500, message: "SMTP Server connection failed", status: "ERR_SMTP_CONNECT"}
    }
  }

  // email send
  async sendEmail({to, subject, message}) {
    try {
      return await this.#transport.sendMail({
        to: to,
        subject: subject, 
        html: message,
        from: SMTPConfig.from
      })
    } catch(exception) {
      // console.error(exception)
      throw {
        code: 500, message: "Email sending failed", status: "ERR_SENDING_EMAIL"
      }
    }
  }
}
// module.exports = MailService;
module.exports = new MailService()