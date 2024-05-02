import express from "express";
import {
    createActivity,
    getAllActivity,
} from "../controllers/activity.controller.js";

const router = express.Router();

router.get("/", getAllActivity);
router.post("/create", createActivity);

export default router;
