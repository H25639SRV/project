require("dotenv").config();

import jwt from "jsonwebtoken";

const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key);
  } catch (e) {
    console.error(e);
  }

  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let data = null;
  try {
    let decoded = jwt.verify(token, key);
    data = decoded;
  } catch (e) {
    console.log(e);
  }
  return data;
};

const checkUserJWT = (req, res, next) => {
  let cookies = req.cookies;
  console.log(cookies);
};
module.exports = { createJWT, verifyToken, checkUserJWT };
