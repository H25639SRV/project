import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
//require("dotenv").config();

const app = express();

//configViewEngine
configViewEngine(app);

//initWebRoutes
initWebRoutes(app);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(">>> JWT Backend is running on the port = " + PORT);
});
