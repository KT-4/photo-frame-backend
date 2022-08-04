const mongoose = require("mongoose");
const Constants = require("../config/constants");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    requierd: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: Constants.DefaultProfileImage,
  },
  role: {
    type: String,
    enum: [Constants.roles.admin, Constants.roles.user],
    default: Constants.roles.user,
  },
  token: {
    type: String,
  },
});

userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

const User = new mongoose.model("User", userSchema);
module.exports = User;
