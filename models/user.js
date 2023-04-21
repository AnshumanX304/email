const mongoose = require("mongoose");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

var EmailSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
});
var EmailModel = mongoose.model("user", EmailSchema);

module.exports = EmailModel;
