require("dotenv").config();
import db from "../models/index";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import { getGroupWithRoles } from "./JWTService";
import { createJWT } from "../middleware/JWTAction";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });
  if (user) {
    return true;
  }
  return false;
};

const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phone: userPhone },
  });
  if (user) {
    return true;
  }
  return false;
};

const registerNewUser = async (rawUserData) => {
  try {
    //check email/phone exist
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
      return {
        EM: "email already exists",
        EC: 1,
      };
    }

    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist === true) {
      return {
        EM: "phone already exists",
        EC: 1,
      };
    }

    //hash user password
    let hashPassword = hashUserPassword(rawUserData.password);
    //create new user
    await db.User.create({
      email: rawUserData.email,
      phone: rawUserData.phone,
      username: rawUserData.username,
      password: hashPassword,
      groupId: 4,
    });
    return {
      EM: "user created",
      EC: 0,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service",
      EC: -2,
    };
  }
};

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
  // res === true
};

const handleUserLogin = async (rawData) => {
  try {
    //check email/phone exist
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
      },
    });

    if (user) {
      let isCorrectPassword = checkPassword(rawData.password, user.password);
      if (isCorrectPassword === true) {
        // let token

        //test role
        let groupWithRoles = await getGroupWithRoles(user);
        let payload = {
          email: user.email,
          groupWithRoles,
          username: user.username,
        };
        let token = createJWT(payload);
        return {
          EM: "oce",
          EC: 0,
          DT: {
            access_token: token,
            groupWithRoles,
            email: user.email,
            username: user.username,
          },
        };
      }
    }

    return {
      EM: "your email, phone or password are incorrect",
      EC: -2,
      DT: "",
    };
    // let isCorrectPassword = checkPassword(raw
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service",
      EC: -2,
      DT: "",
    };
  }
};

module.exports = {
  registerNewUser,
  handleUserLogin,
  hashUserPassword,
  checkEmailExist,
  checkPhoneExist,
};
