"use strict";
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const { use } = require("../../routes/userRouter");
const users = (Sequelize, DataTypes) => {
  const model = Sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    gender: {
      type: DataTypes.ENUM("male", "female"),
      allowNull: true,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM(
        "admin",
        "institution",
        "instructor",
        "student",
        "departmentHead"
      ),
      defaultValue: "student",
    },
    institutionId: {
      type: DataTypes.INTEGER,
    },
    departmentId: {
      type: DataTypes.INTEGER,
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, process.env.SECRET);
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj, process.env.SECRET);
        return token;
      },
    },
  });
  // model.beforeCreate(async (user) => {
  //   let hashedPass = await bcrypt.hash(user.password, 10);
  //   user.password = hashedPass;
  // });
  model.authUser = async (email, password) => {
    const user = await model.findOne({ where: { email: email } });
    console.log(user);
    if (user) {
      const validuser = await bcrypt.compare(password, user.password);
      console.log(validuser);
      if (validuser) {
        return user;
      } else {
        throw new Error("Invalid credentials");
      }
    } else {
      throw new Error("User not found");
    }
  };
  model.bearerToken = async (token) => {
    try {
      const userToken = jwt.verify(token, process.env.SECRET);
      // console.log(`User Token: ${JSON.stringify(userToken)}`);
      if (userToken) {
        const record = await model.findOne({
          where: { username: userToken.username },
        });
        return record;
      }
    } catch (err) {
      throw new Error(err || "Invalid Token");
    }
  };
  return model;
};

module.exports = users;
