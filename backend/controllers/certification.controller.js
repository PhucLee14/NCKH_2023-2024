import certificationModel from "../models/certification.model.js";

export const getAllCertficate = async (req, res) => {
    await certificationModel
        .find({})
        .populate("authorId")
        .then((certificate) => res.json(certificate))
        .catch((err) => res.json(err));
};

export const createCertificate = async (req, res) => {
    try {
        const { authorId, title, name, note, images } = req.body;

        const newCertificate = new certificationModel({
            authorId,
            title,
            name,
            note,
            images,
        });

        const savedCertificate = await newCertificate.save();

        res.status(201).json(savedCertificate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCertificate = async (req, res) => {
    try {
        const { id } = req.params;

        const certificate = await certificationModel
            .find({ authorId: id })
            .populate("authorId");

        res.json(certificate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteCertificate = async (req, res) => {
    const id = req.params.id;
    certificationModel
        .findByIdAndDelete({
            _id: id,
        })
        .then((res) => res.json(res))
        .catch((err) => res.json(err));
};

export const updateCertificateStatusById = async (req, res) => {
    const id = req.params.id;
    try {
        const certificate = await certificationModel.findByIdAndUpdate(
            id,
            {
                status: req.body.status,
            },
            { new: true }
        );
        res.json(certificate);
    } catch (err) {
        res.status(500).json(err);
    }
};
