import express from "express";
import {
    getAllNewsFeed,
    getNewsFeedById,
    updateNewsFeedById,
    uploadNewsFeed,
    deleteNewsFeedById,
    getNewsFeedByAuthorId,
} from "../controllers/newsfeed.controller.js";

const router = express.Router();

router.get("/newsfeed", getAllNewsFeed);
router.get("/newsfeed/:id", getNewsFeedById);
router.get("/getNews/:id", getNewsFeedById);
router.get("/getnews/author/:id", getNewsFeedByAuthorId);
router.put("/update/:id", updateNewsFeedById);
router.post("/upload/", uploadNewsFeed);
router.delete("/delete/:id", deleteNewsFeedById);

export default router;
