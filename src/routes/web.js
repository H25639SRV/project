import express from "express";
import homeController from "../controller/homeController.js";

const router = express.Router();

/**
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
  //path, handlers
  router.get("/", homeController.handleHelloWorld);
  router.get("/user", homeController.handleUserPage);
  router.post("/users/create-user", homeController.handleCreateNewUser);
  router.post("/delete-user/:id", homeController.handleDeleteUser);

  return app.use("/", router);
};

export default initWebRoutes;
