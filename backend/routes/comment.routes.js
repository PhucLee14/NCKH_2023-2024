import express from "express";
import {
    createComment,
    getCommentsByNewsId,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/", createComment);
router.get("/:newsId", getCommentsByNewsId);

export default router;
