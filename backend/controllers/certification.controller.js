import certificationModel from "../models/certification.model.js";
export const createCertificate = async (req, res) => {
    try {
        const { authorId, type, images, files, note } = req.body;

        const newCertificate = new certificationModel({
            authorId,
            type,
            images,
            files,
            note,
        });

        const savedCertificate = await newCertificate.save();

        res.status(201).json(savedCertificate); // Trả về comment mới được tạo
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller để lấy danh sách comment của một bài viết
export const getCertificate = async (req, res) => {
    try {
        const { certificateId } = req.params;

        const certificate = await certificationModel
            .find({ certificateId })
            .populate("authorId");

        res.status(200).json(certificate); // Trả về danh sách các comment
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
