import express from "express";
import authRoute from "./auth";
import chartsRoute from "./auth";
import detailsRoute from "./details";
import insightRoute from "./insights";
const router = express.Router();
const app = express();

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/charts", chartsRoute);
app.use("/api/v1/data", detailsRoute);
app.use("/api/v1/stats", insightRoute);

export default router;