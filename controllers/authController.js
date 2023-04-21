const mailer = require("../utils/mailer");
const jwt = require("jsonwebtoken");
const EmailModel = require("../models/user");
require("dotenv").config();
const { validatemail } = require("../utils/validation");
const { ErrorHandler } = require("../middleware/errors");


const createAccessToken = (user) => {
  return jwt.sign(user, abc, { expiresIn: "1d" });
};

const refreshToken = (req, res, next) => {
  try {
    const rf_token = req.body.refreshtoken;
    if (!rf_token)
      return next(new ErrorHandler(400, "Please Try Again"));

    jwt.verify(rf_token, abc, (err, user) => {
      if (err) return next(new ErrorHandler(401, "Invalid Authentication"));

      const accesstoken = createAccessToken({ id: user._id });

      return res.status(200).json({ accesstoken });
    });
  } catch (err) {
    next(err);
  }
};


const email = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) return next(new ErrorHandler(400, "Email Required."));
    if (!validatemail(email))
      return next(new ErrorHandler(406, "Incorrect Email format."));

    const oldUser = await EmailModel.findOne({
      email: email.toLowerCase(),
    });

    if (oldUser)
      return next(new ErrorHandler(400, "User by this email already exists."));
    if (!oldUser) {
      const new_email = EmailModel({
        email: email,
      });
      const save_email = await new_email.save();
    }
    mailer.sendmail(email);
    return res
      .status(200)
      .json({ success: true, msg: `Send to database ${email}` });
  } catch (err) {
    next(err);
  }
};

module.export = { email ,refreshToken};
