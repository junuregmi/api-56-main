const cloudinarySvc = require("./cloudinary.config")
const bcrypt = require("bcryptjs")
const {Status} = require("../config/constants")
const {randomStringGenerator} = require("../utilities/helpers")
const UserModel = require("../models/User.model");
const mailerSerivce = require("./mailer.serivce")
const {AppConfig} =require("../config/app.config")


class UserService {
  async transformForUserRegister(req) {
    try {
      const data = req.body;
      if (req.file) {
        data.image = await cloudinarySvc.uploadSingleFile(
          req.file.path,
          "/users"
        );
      }
      // password hasing
      // let salt = bcrypt.genSaltSync(12);
      data.password = bcrypt.hashSync(data.password, 12);

      // activation step
      data.status = Status.INACTIVE;
      data.activationToken = randomStringGenerator();
      data.expiryTime = new Date(Date.now() + 86400000);
      // data.expiryTime = new Date(Date.now() + 120000);     // 2 mins from now

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async createUser(data) {
    try {
      const userObj = new UserModel(data);
      await userObj.save();
      return userObj;
    } catch (exception) {
      throw exception;
    }
  }

  getPublicUserProfileFromUser(userObj) {
    return {
      name: userObj.name,
      email: userObj.email,
      role: userObj.role,
      address: userObj.address,
      phone: userObj.phone,
      image: userObj.image,
      status: userObj.status,
      _id: userObj._id,
      createdAt: userObj.createdAt,
      updatedAt: userObj.updatedAt,
    };
  }

  async sendActivationEmail(userObj) {
    try {
      return await mailerSerivce.sendEmail({
        to: userObj.email,
        subject: "Activate your account",
        message: `
          <div style="font-family: Arial, sans-serif; background-color: #f5fff6; padding: 32px;">
            <div style="max-width: 768px; margin: 0 auto; background: #fff; border-radius: 10px; box-shadow: 0 2px 12px rgba(0,0,0,0.07); padding: 32px;">
              <h2 style="color: #218838; margin-bottom: 12px;">Welcome, ${userObj.name}!</h2>
              <blockquote style="border-left: 4px solid #43a047; color: #388e3c; padding: 8px 16px; background: #e8f5e9; border-radius: 5px; margin: 0 0 18px 0;">
                "Every new beginning comes from some other beginning's end.<br />
                <span style="font-size: 13px; color: #388e3c;">Activate your journey with us today!</span>"
              </blockquote>
              <p style="color: #333; font-size: 16px; margin: 22px 0 8px;">
                Your account has been <strong style="color: #218838;">successfully registered</strong>.
              </p>
              <p style="color: #444; margin-bottom: 24px;">We're excited to have you with us. Get started on your path to possibilities by activating your account!</p>
              <div style="text-align: center; margin: 34px 0;">
                <a href="${AppConfig.url}auth/activate/${userObj.activationToken}"
                  style="background-color: #28a745; color: #fff; padding: 16px 40px; border-radius: 30px; font-size: 18px; font-weight:600; text-decoration: none; display: inline-block; box-shadow:0 1px 5px rgba(40,167,69,0.12); transition: background 0.15s;">
                  Activate Your Account
                </a>
              </div>
              <p style="font-size: 14px; color: #31704a; margin-top: 24px;">"The best way to get started is to quit talking and begin doing." <em>- Walt Disney</em></p>
              <p style="font-size: 16px; margin-top: 32px;">
                <span style="color:#218838; font-weight:bold;">Alternate Activation Link:</span>
              </p>
              <p>
                <a href="${AppConfig.url}auth/activate/${userObj.activationToken}"
                  style="color: #218838; text-decoration: underline; font-size: 15px; word-break: break-all;">
                  ${AppConfig.url}auth/activate/${userObj.activationToken}
                </a>
              </p>
              <p style="font-size:13px; color: #999; margin-top: 30px;">If the above button does not work, please copy and paste the link into your browser.</p>
              <hr style="border: none; border-top: 1.5px solid #e8e8e8; margin: 36px 0;">
              <p style="color:#333; font-size: 15px; margin-bottom:6px;">Regards,<br/><span style="font-weight: bold; color:#218838;">System Admin</span></p>
              <small style="color:#8a8a8a;">
                <em>
                  If you are not the intended recipient, you can safely ignore this email. 
                  Please do not reply to this message and do not print it unless necessary.<br>
                  <span style="color:#218838;">Your privacy and security are important to us.</span>
                </em>
              </small>
            </div>
          </div>
          `,
      });
    } catch (exception) {
      throw exception;
    }
  }

  async reSendActivationEmail(userObj) {
    try {
      return await mailerSerivce.sendEmail({
        to: userObj.email,
        subject: "Re-Activate your account",
        message: `
          <div style="font-family: Arial, sans-serif; background-color: #f5fff6; padding: 32px;">
            <div style="max-width: 768px; margin: 0 auto; background: #fff; border-radius: 10px; box-shadow: 0 2px 12px rgba(0,0,0,0.07); padding: 32px;">
              <h2 style="color: #218838; margin-bottom: 12px;">Hello again, ${userObj.name}!</h2>
              <blockquote style="border-left: 4px solid #d97706; color: #b26b00; padding: 8px 16px; background: #fff8e1; border-radius: 5px; margin: 0 0 18px 0;">
                "A fresh start!<br />
                <span style="font-size: 13px; color: #b26b00;">Please use your new activation link below.</span>"
              </blockquote>
              <p style="color: #333; font-size: 16px; margin: 22px 0 8px;">
                A <strong style="color: #b26b00;">new activation link</strong> has been generated for your account. 
              </p>
              <p style="color: #b26b00; font-size: 15px;">
                <strong>Note:</strong> The previous activation link is now <span style="color:red;">invalid</span> and will no longer work.
              </p>
              <p style="color: #444; margin-bottom: 24px;">To activate your account, please use the button below:</p>
              <div style="text-align: center; margin: 34px 0;">
                <a href="${AppConfig.url}auth/activate/${userObj.activationToken}"
                  style="background-color: #ff9800; color: #fff; padding: 16px 40px; border-radius: 30px; font-size: 18px; font-weight:600; text-decoration: none; display: inline-block; box-shadow:0 1px 5px rgba(255,152,0,0.11); transition: background 0.15s;">
                  Activate Your Account
                </a>
              </div>
              <p style="font-size: 14px; color: #b26b00; margin-top: 24px;">"Opportunities are usually disguised as hard work, so most people don't recognize them." <em>- Ann Landers</em></p>
              <p style="font-size: 16px; margin-top: 32px;">
                <span style="color:#b26b00; font-weight:bold;">Alternate Activation Link:</span>
              </p>
              <p>
                <a href="${AppConfig.url}auth/activate/${userObj.activationToken}"
                  style="color: #b26b00; text-decoration: underline; font-size: 15px; word-break: break-all;">
                  ${AppConfig.url}auth/activate/${userObj.activationToken}
                </a>
              </p>
              <p style="font-size:13px; color: #999; margin-top: 30px;">If the above button does not work, please copy and paste the link into your browser.</p>
              <hr style="border: none; border-top: 1.5px solid #e8e8e8; margin: 36px 0;">
              <p style="color:#333; font-size: 15px; margin-bottom:6px;">Regards,<br/><span style="font-weight: bold; color:#218838;">System Admin</span></p>
              <small style="color:#8a8a8a;">
                <em>
                  If you did not request a new activation link, you can safely ignore this email. 
                  Please do not reply to this message and do not print it unless necessary.<br>
                  <span style="color:#b26b00;">Your privacy and security are important to us.</span>
                </em>
              </small>
            </div>
          </div>
          `,
      });
    } catch (exception) {
      throw exception;
    }
  }

  async getSingleUserByFilter(filter) {
    try {
      const data = await UserModel.findOne(filter);
      return data;
    } catch(exception) {
      throw exception
    }
  }

  async getAllRowsByFilter(filter, config) {
    try {
      const skip = (config.page -1 ) * config.limit

      const data = await UserModel.find(filter)
        .sort({name: "asc"})
        .skip(skip)
        .limit(config.limit)
      const total = await UserModel.countDocuments(filter)

      return {
        data: data.map((user) => this.getPublicUserProfileFromUser(user)),
        pagination: {
          page: config.page,
          limit: config.limit,
          total: +total,
          noOfPages: Math.ceil(total / config.limit),
        },
      };
    } catch(exception) {
      throw exception
    }
  }

  async updateSingleRowByFilter(filter, data) {
    try {
      const updatedUser = await UserModel.findOneAndUpdate(filter, data, {new: true})
      return updatedUser;
    } catch(exception) {
      throw exception
    }
  }
}

module.exports = new UserService()