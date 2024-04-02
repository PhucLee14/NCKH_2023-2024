import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Upload = () => {
    const [content, setContent] = useState("");
    const [type, setType] = useState("");
    const [images, setImages] = useState({});

    const handleDrag = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        console.log(e.dataTransfer.files);
        setImages(e.dataTransfer.files);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(content, type, typeof images);
        axios
            .post("http://localhost:5000/upload", { content, type, images })
            .then((res) => {
                toast.success("Done");
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <form className="h-full flex flex-col justify-center items-center">
                <div className="w-1/2 bg-white rounded-xl mt-4 flex flex-col h-64 shadow-2xl flex flex-col items-center">
                    <textarea
                        className="textarea textarea-bordered w-full h-5/6 border-none focus:outline-none"
                        placeholder="Content"
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                    ></textarea>
                    <select
                        className=" select-bordered w-[calc(100%-1rem)] h-8 text-sm bg-slate-200 rounded-lg pl-1 outline-none"
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option disabled selected className="bg-white">
                            Choose type
                        </option>
                        <option className="bg-white">
                            Đánh giá về ý thức tham gia học tập
                        </option>
                        <option className="bg-white">
                            Đánh giá về ý thức chấp hành nội quy, quy chế, quy
                            định trong nhà trường
                        </option>
                        <option className="bg-white">
                            Đánh giá ý thức tham gia các hoạt động chính trị-xã
                            hội, văn hoá, văn nghệ, thể thao, phòng chống tội
                            phạm và các tệ nạn xã hội
                        </option>
                        <option className="bg-white">
                            Đánh giá ý thức công dân quan hệ cộng đồng
                        </option>
                        <option className="bg-white">
                            Đánh giá về ý thức và kết quả khi tham gia công tác
                            cán bộ lớp, các đoàn thể, tổ chức trong Nhà trường
                            hoặc đạt được thành thành tích đặc biệt trong học,
                            tập rèn luyện
                        </option>
                    </select>
                </div>
                <div className="w-1/3 bg-slate-50 rounded-xl flex justify-center items-center h-64 mt-12 shadow-2xl">
                    <div
                        className="flex justify-center items-center border-dashed border-spacing-8 border-slate-400 border-2 p-16 rounded-2xl bg-purple-50 w-full m-6"
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <span className="text-slate-400">
                            Drop image here or
                        </span>
                        <span className="pl-1 text-indigo-500 font-bold cursor-pointer">
                            {" "}
                            Browse
                        </span>
                    </div>
                </div>
                <button onClick={handleSubmit}>submit</button>
            </form>
        </>
    );
};

export default Upload;
