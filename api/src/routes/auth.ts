import express from "express";
const router = express.Router();
import {signup, userData, login, logout} from "../controller/auth";

router.post('/signup', signup);
router.get('/users', userData);
router.post('/login', login);
router.delete('/logout', logout);

export default router;