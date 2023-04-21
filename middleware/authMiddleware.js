// const jwt = require("jsonwebtoken");
// const User = require("../models/user");

// const requireAuth = (req, res, next) => {
//   const token = req.cookies.jwt;

//   // check json web token exists & is verified
//   if (token) {
//     jwt.verify(token, "abc", (err, decodedToken) => {
//       if (err) {
//         console.log(err.message);
//         res.redirect("/signup");
//       } else {
//         console.log(decodedToken);
//         next();
//       }
//     });
//   } else {
//     res.redirect("/signup");
//   }
// };

// // check current user
// const checkUser = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, "abc", async (err, decodedToken) => {
//       if (err) {
//         res.locals.user = null;
//         next();
//       } else {
//         let user = await User.findById(decodedToken.id);
//         res.locals.user = user;
//         next();
//       }
//     });
//   } else {
//     res.locals.user = null;
//     next();
//   }
// };

// module.exports = { requireAuth, checkUser };

// const signup = async (req, res, next) => {
//   try {
//     const { email } = req.body;
//     if (email) {
//       const isEmail = await EmailModel.findOne({ email: email });
//       if (!isEmail) {
//         const new_email = EmailModel({
//           email: email,
//         });
//         const save_email = await new_email.save();
//         const mailoptions = {
//           from: "a6394tul@gmail.com",
//           to: email,
//           subject:
//             "Dear Customer, sign up to your Shop account is successfull !",
//           html: `<h1> Hello to my Shop </h1>`,
//         };
//         transporter.sendMail(mailoptions, (err, info) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log("Mail sent");
//           }
//         });
//         res.status(200).json({
//           message: "Details have been posted successfully!",
//         });
//       } else {
//         res.status(403).json({
//           message: "Email Already Exists",
//         });
//       }
//     } else {
//       res.status(403).json({
//         message: "Please enter email",
//       });
//     }
//   } catch (err) {
//     next(err);
//   }
// };