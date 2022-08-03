const User = require("../models/user.model");

const userProfile = async (req, res) => {
  try {
    const _id = req.user.user_id;
    const userProfile = await User.findById(_id);
    res.status(200).send(userProfile);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  userProfile,
};
