const User = require("../models/user.model");
//--------Get User Profile---------//
const userProfile = async (req, res) => {
  try {
    const _id = req.user.user_id;
    const userProfile = await User.findById(_id);
    res.status(200).send(userProfile);
  } catch (e) {
    res.status(500).send(e);
  }
};
//--------Update User Profile---------//
const editProfile = async (req, res) => {
  try {
    const _id = req.user.user_id;
    const userProfile = await User.findByIdAndUpdate(
      _id,
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
      },
      { new: true }
    );
    res.status(200).send(userProfile);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  userProfile,
  editProfile,
};
