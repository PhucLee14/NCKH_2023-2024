import express from "express";
import {
    createCertificate,
    getCertificate,
} from "../controllers/certification.controller.js";

const router = express.Router();

router.post("/", createCertificate);
router.get("/:newsId", getCertificate);

export default router;
