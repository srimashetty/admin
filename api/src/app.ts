import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pool from "../config/db";
import authRoute from "./routes/auth";
import detailsRoute from "./routes/details";
import chartsRoute from "./routes/charts";
import insightRoute from "./routes/insights";
import routes from "./routes/routes";

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/charts", chartsRoute);
app.use("/api/v1/data", detailsRoute);
app.use("/api/v1/stats", insightRoute);

app.listen(5000, "localhost", () => {
  console.log("listening on port 5000");
  // routes;
});



