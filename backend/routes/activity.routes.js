import express from "express";
import {
    createActivity,
    getActivityById,
    getAllActivity,
} from "../controllers/activity.controller.js";

const router = express.Router();

router.get("/", getAllActivity);
router.get("/:type", getActivityById);
router.post("/create", createActivity);

export default router;
