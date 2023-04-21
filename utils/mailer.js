const nodemailer = require("nodemailer");

const sendmail = async (email) => {
  try {
    const msg = {
      from: 'CCC"a6394tul@gmail.com"',
      to: email,
      subject: `Thanks for Registering by CCC`,
      html: `
        <div
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <center><h1>Welcome to <span style="color:green;">CCC!</span></h1></center>
          <h3>We are glad to have you!</h3>
     </div>
      `,
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "a6394tul@gmail.com",
        pass: process.env.password,
      },
    });

    transporter.sendMail(msg, (err) => {
      if (err) {
        console.log(err);
        return false;
      } else {
        console.log("mail sent");
        return true;
      }
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = { sendmail };
