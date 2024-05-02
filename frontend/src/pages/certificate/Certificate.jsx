import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import storage from "../../firebase";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    uploadBytes,
} from "firebase/storage";

const Certificate = () => {
    const [authorId, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState([]);
    const [imagesObj, setImagesObj] = useState();

    const inputRef = useRef(null);

    const [check, setCheck] = useState(false);
    var localStorageData = localStorage.getItem("user");

    if (localStorageData) {
        var userData = JSON.parse(localStorageData);
        useEffect(() => {
            setAuthor(userData._id);
        }, []);
    } else {
        console.log("Không tìm thấy dữ liệu trong local storage");
    }

    const onDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
    };

    const onDragLeave = (e) => {
        e.preventDefault();
    };

    const onDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files[0];
        console.log(files);
        setCheck(!check);
    };

    const onFileSelect = (e) => {
        const files = e.target.files;
        setImagesObj(files);
        console.log("imgobj: ", imagesObj);
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split("/")[0] !== "image") {
                console.log(files[i]);
                continue;
            }
            if (
                !image.some((e) => {
                    e.name === files[i].name;
                })
            ) {
                setImage((prevImages) => [
                    ...prevImages,
                    {
                        img: files[i],
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                    },
                ]);
            }
        }
    };

    const selectFiles = (e) => {
        inputRef.current.click();
    };

    const deleteImage = (index) => {
        setImage((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newObj = {};
        image.forEach((value, index) => {
            newObj[index] = value;
        });
        setImagesObj(newObj);
        console.log(typeof imagesObj);
        const images = []; // Mảng để lưu trữ downloadURL của từng ảnh

        for (let i = 0; i < imagesObj.length; i++) {
            const imageRef = ref(
                storage,
                `/mulitpleFiles/${imagesObj[i].name}`
            );

            try {
                // Tải lên ảnh lên Firebase Storage
                await uploadBytes(imageRef, imagesObj[i]);

                // Lấy downloadURL của ảnh vừa tải lên
                const url = await getDownloadURL(imageRef);

                // Thêm downloadURL vào mảng downloadURLs
                images.push(url);

                // setImgs((prevImages) => [...prevImages, url]);

                console.log("Upload success:", url);
            } catch (error) {
                console.error("Upload error:", error);
            }
        }

        console.log("Download URLs:", typeof images);

        // setImgs(downloadURLs);
        console.log(images);
        console.log(typeof image);
        // console.log("img:", imgs);

        console.log(title, note, type, images);
        if (note == "" || type == "DEFAULT") {
            toast.error("Please input your content");
        } else {
            axios
                .post("http://localhost:5000/certificate/create", {
                    authorId,
                    type,
                    title,
                    note,
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
            setNote("");
            setType("");
            setImage([]);
        }
    };

    return (
        <>
            <form className="w-2/5 rounded-lg h-[calc(100%-3.5rem)] flex flex-col justify-center items-center mt-20 bg-white">
                <p className="font-semibold mt-4 text-xl">
                    Cập nhật minh chứng
                </p>
                <div className="w-full bg-white border-y mt-4 flex flex-col items-center">
                    <input
                        id="text-title"
                        className="textarea textarea-bordered w-full border-none focus:outline-none"
                        placeholder="Tiêu đề"
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    ></input>
                </div>
                <div className="w-full bg-white rounded-xl mt-4 h-48 flex flex-col items-center">
                    <textarea
                        id="text-content"
                        className="textarea textarea-bordered w-full min-h-40 h-2/3 border-none focus:outline-none"
                        placeholder="Ghi chú"
                        onChange={(e) => {
                            setNote(e.target.value);
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
                        <option
                            className="bg-white"
                            value="Đánh giá về ý thức tham gia học tập"
                        >
                            Đánh giá về ý thức tham gia học tập
                        </option>
                        <option
                            className="bg-white"
                            value="Đánh giá về ý thức chấp hành nội quy, quy chế, quy định trong nhà trường"
                        >
                            Đánh giá về ý thức chấp hành nội quy, quy chế, quy
                            định trong nhà trường
                        </option>
                        <option
                            className="bg-white"
                            value="Đánh giá ý thức tham gia các hoạt động chính trị-xã hội, văn hoá, văn nghệ, thể thao, phòng chống tội phạm và các tệ nạn xã hội"
                        >
                            Đánh giá ý thức tham gia các hoạt động chính trị-xã
                            hội, văn hoá, văn nghệ, thể thao, phòng chống tội
                            phạm và các tệ nạn xã hội
                        </option>
                        <option
                            className="bg-white"
                            value="Đánh giá ý thức công dân quan hệ cộng đồng"
                        >
                            Đánh giá ý thức công dân quan hệ cộng đồng
                        </option>
                        <option
                            className="bg-white"
                            value="Đánh giá về ý thức và kết quả khi tham gia công tác cán bộ lớp, các đoàn thể, tổ chức trong Nhà trường hoặc đạt được thành thành tích đặc biệt trong học, tập rèn luyện"
                        >
                            Đánh giá về ý thức và kết quả khi tham gia công tác
                            cán bộ lớp, các đoàn thể, tổ chức trong Nhà trường
                            hoặc đạt được thành thành tích đặc biệt trong học,
                            tập rèn luyện
                        </option>
                    </select>
                </div>
                <div className="w-full flex justify-center items-center min-h-48 mt-2">
                    <div
                        className="flex flex-col justify-center items-center border-dashed border-spacing-8 border-slate-400 border-2 py-20 rounded-2xl bg-purple-50 w-full m-4 mb-0"
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                    >
                        <span className="text-slate-400">
                            Kéo thả hình ảnh vào đây hoặc
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
                            Duyệt
                        </span>
                    </div>
                </div>
                <div className="w-1/3 bg-slate-50 flex flex-wrap shadow-xl mt-4 rounded-lg">
                    {image.map((img, index) => (
                        <div className="bg-gray-500 w-16 h-16 rounded-md m-2 mr-1 relative overflow-hidden">
                            <span
                                className="absolute bg-white rounded-full w-4 h-4 text-center right-0 top-1 right-1 leading-3 cursor-pointer"
                                onClick={() => deleteImage(index)}
                            >
                                &times;
                            </span>
                            <img
                                src={img.url}
                                alt=""
                                className="w-full h-full"
                            />
                        </div>
                    ))}
                </div>
                <button
                    className="btn btn-active btn-primary text-white m-4 mb-8"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default Certificate;
