import commentModel from "../models/comment.model.js";
export const createComment = async (req, res) => {
    try {
        // Lấy dữ liệu từ request body
        const { senderId, newsId, content } = req.body;

        // Tạo một đối tượng mới comment dựa trên dữ liệu nhận được
        const newComment = new commentModel({
            senderId,
            newsId,
            content,
        });

        // Lưu comment vào cơ sở dữ liệu
        const savedComment = await newComment.save();

        res.status(201).json(savedComment); // Trả về comment mới được tạo
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller để lấy danh sách comment của một bài viết
export const getCommentsByNewsId = async (req, res) => {
    try {
        const { newsId } = req.params;

        const comments = await commentModel
            .find({ newsId })
            .populate("senderId");

        res.status(200).json(comments); // Trả về danh sách các comment
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
