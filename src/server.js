import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import bodyParser from "body-parser";
const app = express();

//configViewEngine
configViewEngine(app);

//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//initWebRoutes
initWebRoutes(app);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(">>> JWT Backend is running on the port = " + PORT);
});
