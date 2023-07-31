require("dotenv").config();
const { usersModel } = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function signInHandler(req, res) {
  //   const { email, password } = req.user;
  //   const record = await usersModel.findOne({
  //     where: {
  //       email: email,
  //     },
  //   });
  //   if (record) {
  //     const validPassword = await bcrypt.compare(password, record.password);
  //     if (validPassword) {
  //       record.token = jwt.sign({ record }, process.env.ACCESS_TOKEN_SECRET);
  //       res.json(record);
  //     } else {
  //       res.send("invalid username/password");
  //     }
  //   } else {
  //     res.send("invalid username/password");
  //   }
  res.status(200).json(req.user);
}
module.exports = signInHandler;
