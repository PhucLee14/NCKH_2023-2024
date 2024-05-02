import express from "express";
import {
    createCertificate,
    deleteCertificate,
    getAllCertficate,
    getCertificate,
    updateCertificateStatusById,
} from "../controllers/certification.controller.js";

const router = express.Router();

router.get("/", getAllCertficate);
router.get("/:id", getCertificate);
router.put("/update/status/:id", updateCertificateStatusById);
router.post("/create", createCertificate);
router.delete("/delete/:id", deleteCertificate);

export default router;
