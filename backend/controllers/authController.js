const User = require("../models/userModel");
var jwt = require("jsonwebtoken");

const signInToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
};
exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = signInToken(newUser._id);
    res.status(200).json({
      token,
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  // const email = req.body.email;
  // const password = req.body.password;

  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      status: "error",
      message: "Please provide both email and password!",
    });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePasswordDb(password, user.password))) {
    res.status(400).json({
      status: "error",
      message: "Password doesnt matches",
    });
  }

  const token = signInToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
};
