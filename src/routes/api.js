import express from "express";
import apiController from "../controller/apiController";
const router = express.Router();

/**
 * @param {*} app : express app
 */

const initApiRoutes = (app) => {
  //rest api
  // get - r, post - c, post - u, delete - d
  router.get("/test-api", apiController.testApi);
  router.post("/register", apiController.handleRegister);

  return app.use("/api/v1/", router);
};

export default initApiRoutes;
