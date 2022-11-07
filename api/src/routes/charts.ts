import express from "express";
const router = express.Router();
import {getPieChart, postPieChart, getRadialChart, postRadialChart, getAreaChart, postAreaChart, getBarChart, postBarChart} from "../controller/charts";
import authToken from "../middleware/authenticateToken";


router.get('/piechart', getPieChart);
router.post('/defaultPiechart', postPieChart);
router.get('/barchart', getRadialChart);
router.post('/defaultBar', postRadialChart);
router.get('/areachart',authToken, getAreaChart);
router.post('/defaultArea', postAreaChart);
router.get('/radialchart', getBarChart);
router.post('/defaultRadial', postBarChart);

export default router;