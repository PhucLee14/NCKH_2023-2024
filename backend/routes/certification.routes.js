import express from "express";
import {
    createCertificate,
    deleteCertificate,
    getCertificate,
} from "../controllers/certification.controller.js";

const router = express.Router();

router.post("/", createCertificate);
router.get("/:id", getCertificate);
router.delete("/delete/:id", deleteCertificate);

export default router;
