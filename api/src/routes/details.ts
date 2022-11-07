import express from "express";
const router = express.Router();
import {getDetails, getDownloadData, rangeReport} from "../controller/details"
import authToken from "../middleware/authenticateToken";

router.get('/details',authToken, getDetails);
router.get('/download', getDownloadData);
router.post('/range', rangeReport);

export default router;