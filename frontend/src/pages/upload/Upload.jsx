import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Upload = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [type, setType] = useState("");
    const [images, setImages] = useState([]);

    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef(null);

    const onDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
    };

    const onDragLeave = (e) => {
        e.preventDefault();
    };

    const onDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split("/")[0] !== "image") {
                console.log(files[i]);
                continue;
            }
            if (
                !images.some((e) => {
                    e.name === files[i].name;
                })
            ) {
                setImages((prevImages) => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                    },
                ]);
            }
        }
    };

    const selectFiles = (e) => {
        inputRef.current.click();
        console.log(images);
    };

    const onFileSelect = (e) => {
        const files = e.target.files;
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split("/")[0] !== "image") continue;
            if (
                !images.some((e) => {
                    e.name === files[i].name;
                })
            ) {
                setImages((prevImages) => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                    },
                ]);
            }
        }
    };

    const deleteImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(title, content, type, typeof images);
        if (content == "" || type == "DEFAULT") {
            toast.error("Please input your content");
        } else {
            axios
                .post("http://localhost:5000/upload", {
                    title,
                    content,
                    type,
                    images,
                })
                .then((res) => {
                    toast.success("Done");
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
            document.querySelector("#text-title").value = "";
            document.querySelector("#text-content").value = "";
            document.querySelector("#select-type").selectedIndex = "0";
            setTitle("");
            setContent("");
            setType("");
            setImages([]);
        }
    };

    return (
        <>
            <form className="h-[calc(100%-3.5rem)] flex flex-col justify-center items-center mt-14">
                <div className="w-1/2 bg-white rounded-xl mt-4 flex flex-col shadow-2xl flex flex-col items-center">
                    <input
                        id="text-title"
                        className="textarea textarea-bordered w-full border-none focus:outline-none"
                        placeholder="Title"
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    ></input>
                </div>
                <div className="w-1/2 bg-white rounded-xl mt-4 flex flex-col h-64 shadow-2xl flex flex-col items-center">
                    <textarea
                        id="text-content"
                        className="textarea textarea-bordered w-full min-h-52 h-5/6 border-none focus:outline-none"
                        placeholder="Content"
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                    ></textarea>
                    <select
                        id="select-type"
                        className=" select-bordered w-[calc(100%-1rem)] h-8 text-sm bg-slate-200 rounded-lg pl-1 outline-none"
                        onChange={(e) => setType(e.target.value)}
                        defaultValue={"DEFAULT"}
                    >
                        <option disabled className="bg-white" value="DEFAULT">
                            Choose type
                        </option>
                        <option className="bg-white" value="0">
                            Đánh giá về ý thức tham gia học tập
                        </option>
                        <option className="bg-white" value="1">
                            Đánh giá về ý thức chấp hành nội quy, quy chế, quy
                            định trong nhà trường
                        </option>
                        <option className="bg-white" value="2">
                            Đánh giá ý thức tham gia các hoạt động chính trị-xã
                            hội, văn hoá, văn nghệ, thể thao, phòng chống tội
                            phạm và các tệ nạn xã hội
                        </option>
                        <option className="bg-white" value="3">
                            Đánh giá ý thức công dân quan hệ cộng đồng
                        </option>
                        <option className="bg-white" value="4">
                            Đánh giá về ý thức và kết quả khi tham gia công tác
                            cán bộ lớp, các đoàn thể, tổ chức trong Nhà trường
                            hoặc đạt được thành thành tích đặc biệt trong học,
                            tập rèn luyện
                        </option>
                    </select>
                </div>
                <div className="w-1/3 bg-slate-50 rounded-xl flex justify-center items-center min-h-48 mt-12 shadow-2xl">
                    <div
                        className="flex justify-center items-center border-dashed border-spacing-8 border-slate-400 border-2 p-16 rounded-2xl bg-purple-50 w-full m-6"
                        onDragOver={onDragOver}
                        onDragleave={onDragLeave}
                        onDrop={onDrop}
                    >
                        <span className="text-slate-400">
                            Drop image here or
                        </span>
                        <input
                            type="file"
                            multiple
                            hidden
                            ref={inputRef}
                            onChange={onFileSelect}
                            accept="image/png, image/gif, image/jpeg, video/mp4,video/x-m4v,video/*"
                        />
                        <span
                            className="pl-1 text-indigo-500 font-bold cursor-pointer"
                            onClick={selectFiles}
                            role="button"
                        >
                            {" "}
                            Browse
                        </span>
                    </div>
                </div>
                <div className="w-1/3 bg-slate-50 flex flex-wrap shadow-xl mt-4 rounded-lg">
                    {/* <div className="bg-gray-500 w-16 h-16 rounded-md m-2 mr-1 relative">
                        <span className="absolute bg-white rounded-full w-4 h-4 text-center -right-1 -top-1 leading-4 cursor-pointer">
                            &times;
                        </span>
                        <img src="" alt="" className="w-full h-full" />
                    </div> */}

                    {images.map((image, index) => (
                        <div
                            className="bg-gray-500 w-16 h-16 rounded-md m-2 mr-1 relative overflow-hidden"
                            key={index}
                        >
                            <span
                                className="absolute bg-white rounded-full w-4 h-4 text-center right-0 top-1 mr-1 leading-3 cursor-pointer"
                                onClick={() => deleteImage(index)}
                            >
                                &times;
                            </span>
                            <img
                                src={image.url}
                                alt={image.name}
                                className="w-full h-full"
                            />
                        </div>
                    ))}
                </div>
                <button
                    class="btn btn-active btn-primary text-white m-4"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default Upload;
