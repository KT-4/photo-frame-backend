const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require("../models/token.model");
const crypto = require("crypto");
const { sendEmail } = require("../config/utility");

//--------User Register Controller--------//
const userRegister = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;

    if (!(email && password && first_name && last_name)) {
      res.status(400).send({ message: "All input is required" });
    }

    const checkUser = await User.findOne({ email });

    if (checkUser) {
      res.status(409).send({ message: "User Alredy Exist. Please Login" });
    }

    // Hashing Password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create A User
    const user = await User.create({
      first_name,
      last_name,
      email,
      role,
      password: hashPassword,
    });

    // Create jwt token
    const token = jwt.sign(
      { user_id: user._id, email, role: role },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );

    user.token = token;

    res.status(201).send({ message: "", user });
  } catch (e) {
    res.status(500).send(e);
  }
};

//--------User Login Controller--------//
const userLoging = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send({ message: "All input is required" });
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email, role: user.role },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );

      user.token = token;

      res.status(200).send(user);
    } else {
      res.status(401).send({ message: "Please Check your Credentials" });
    }
  } catch (e) {
    res.status(500).send();
  }
};

//--------Forgot password Controller--------//
const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send({ message: "email doesn't exist" });
    }

    let token = await Token.findOne({ userId: user._id });

    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const link = `${process.env.CLIENT_URL}/reset-password/${user._id}/${token.token}`;
    await sendEmail(user.email, "Reset Password", link);

    res
      .status(200)
      .send({ message: "password reset link sent to your email account" });
  } catch (e) {
    res.status(500).send({ message: "An error occured" });
  }
};

//--------- Reset Password Controller-----------//

const resetPassword = async (req, res) => {
  try {
    let _id = req.params.userId;
    const { newPassword } = req.body;

    const user = await User.findById({ _id });

    if (!user) {
      return res.status(400).send({ message: "Invelid link or expired" });
    }

    const token = await Token.findOne({
      userId: user.id,
      token: req.params.token,
    });

    if (!token) {
      return res.status(400).send({ message: "Invelid link or expired" });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashPassword;
    await user.save();
    await token.delete();

    res.send({ message: "password reset sucessfully." });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: '"An error occured"' });
  }
};

module.exports = {
  userRegister,
  userLoging,
  forgotPassword,
  resetPassword,
};
