const User = require("../models/user");
const bcrypt = require("bcrypt");
const post = require("../models/post");

class UserControler {
  update = async (req, res) => {
    if (req.body.userId === req.params.id) {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      try {
        const updateUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );

        return res.status(200).json(updateUser);
      } catch (error) {
        return resizeBy.status(400).json(error);
      }
    } else {
      res.status(401).json("You can update only your accounts");
    }
  };
  delete = async (req, res) => {
    if (req.body.userId === req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        try {
          await post.deleteMany({ username: user.username });
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json("User has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } catch (err) {
        res.status(404).json("User not found!");
      }
    } else {
      res.status(401).json("You can delete only your account!");
    }
  };
  getById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      user.password = undefined;
      res.status(200).json(user);
    } catch (error) {
      return res.status(400).json(error);
    }
  };
}

module.exports = new UserControler();
