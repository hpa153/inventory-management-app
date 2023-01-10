import express from "express";

import { contactUs } from "../controllers/contactController.js";
import authUser from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/", authUser, contactUs);

export default router;
