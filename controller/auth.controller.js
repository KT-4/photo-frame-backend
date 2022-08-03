const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//--------User Register Controller--------//
const userRegister = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    const checkUser = await User.findOne({ email });

    if (checkUser) {
      res.status(409).send("User Alredy Exist. Please Login");
    }

    // Hashing Password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create A User
    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashPassword,
    });

    // Create jwt token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );

    user.token = token;

    res.status(201).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

//--------User Login Controller--------//
const userLoging = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );

      user.token = token;

      res.status(200).send(user);
    }
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = {
  userRegister,
  userLoging,
};
