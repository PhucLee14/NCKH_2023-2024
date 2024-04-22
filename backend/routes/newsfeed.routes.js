import express from "express";
import {
    getAllNewsFeed,
    getNewsFeedById,
    updateNewsFeedById,
    uploadNewsFeed,
    deleteNewsFeedById,
} from "../controllers/newsfeed.controller.js";

const router = express.Router();

router.get("/", getAllNewsFeed);
router.get("/:id", getNewsFeedById);
router.put("/:id", updateNewsFeedById);
router.post("/", uploadNewsFeed);
router.delete("/:id", deleteNewsFeedById);

export default router;
