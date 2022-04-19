const User = require("../models/user");
const bcrypt = require("bcrypt");

class AuthController {
  register = async (req, res) => {
    try {
      const { username, password, email } = req.body;

      const isEmail = await User.findOne({ email });
      if (isEmail) {
        return res.status(400).json("Email already register");
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        password: hashPassword,
        email,
      });

      user.password = undefined;

      res.status(201).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  login = async (req, res) => {
    try {
      const { username, password } = req.body;

      const isUser = await User.findOne({ username: username });
      if (!isUser) {
        return res.status(400).json("Wrong credentials");
      }

      const validPassword = await bcrypt.compare(password, isUser.password);
      if (!validPassword) {
        return res.status(400).json("Wrong credentials");
      }

      isUser.password = undefined;

      return res.status(200).json(isUser);
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new AuthController();
