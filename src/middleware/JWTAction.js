require("dotenv").config();

import jwt from "jsonwebtoken";

const nonSecurePaths = ["/", "/register", "/login"];

const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRED_IN }); //60ms
  } catch (e) {
    console.error(e);
  }

  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (e) {
    console.log(e);
  }
  return decoded;
};

const checkUserJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) {
    return next();
  }
  let cookies = req.cookies;
  if (cookies && cookies.jwt) {
    let token = cookies.jwt;
    let decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        EM: "Not authenticated",
        EC: "-1",
        DT: "",
      });
    }
    console.log("my jwt: ", cookies.jwt);
  } else {
    return res.status(401).json({
      EM: "Unauthorized",
      EC: "-1",
      DT: "",
    });
  }
};

const checkUserPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path) || req.path === "/account") {
    return next();
  }
  if (req.user) {
    let email = req.user.email;
    let roles = req.user.groupWithRoles.Roles;
    let currentUrl = req.path;
    if (!roles || roles.length === 0) {
      return res.status(403).json({
        EM: "u dont have permission to access this resource",
        EC: "-1",
        DT: "",
      });
    }
    let canAccess = roles.some((item) => item.url === currentUrl);
    if (canAccess === true) {
      next();
    } else {
      return res.status(403).json({
        EM: "u dont have permission to access this resource",
        EC: "-1",
        DT: "",
      });
    }
  } else {
    return res.status(401).json({
      EM: "Unauthorized",
      EC: "-1",
      DT: "",
    });
  }
};

module.exports = { createJWT, verifyToken, checkUserJWT, checkUserPermission };
