import express from "express";
const router = express.Router();
import {getInsights} from "../controller/insights";


router.get('/insights', getInsights);

export default router;