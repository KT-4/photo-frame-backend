const { json } = require("express");
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
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
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
