import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDots } from "react-icons/bs";
import { FaRegQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { extractTime } from "../../utils/extractTime";

const NewsFeed = () => {
    const [newsFeeds, setNewsFeeds] = useState([]);
    const [id, setId] = useState("");
    const [search, setSearch] = useState("");
    const [temp, setTemp] = useState("");
    const [checkValues, setCheckValues] = useState("");
    const [displayDropdown, setDisplayDropdown] = useState(false);
    const formattedTime = extractTime(newsFeeds.createdAt);

    const typeList = [
        "Đánh giá về ý thức tham gia học tập",
        "Đánh giá về ý thức chấp hành nội quy, quy chế, quy định trong nhà trường",
        "Đánh giá ý thức tham gia các hoạt động chính trị-xã hội, văn hoá, văn nghệ, thể thao, phòng chống tội phạm và các tệ nạn xã hội",
        "Đánh giá ý thức công dân quan hệ cộng đồng",
        "Đánh giá về ý thức và kết quả khi tham gia công tác cán bộ lớp, các đoàn thể, tổ chức trong Nhà trường hoặc đạt được thành thành tích đặc biệt trong học, tập rèn luyện",
    ];

    useEffect(() => {
        axios
            .get("http://localhost:5000/newsfeed")
            .then((res) => setNewsFeeds(res.data))
            .catch((err) => console.log("loi ben frontend"));
    }, []);

    const handleShowModal = (id) => {
        document.getElementById("my_modal_2").showModal();
        console.log(id);
    };

    const handleDelete = () => {
        console.log(id);
        axios
            .delete("http://localhost:5000/delete/" + id)
            .then((res) => {
                document.getElementById("my_modal_2").style.display = "none";
                toast.success("Delete success!");
                window.location.reload();
            })
            .then((err) => {
                console.log(err);
            });
    };
    const handleFilter = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            // setCheckValues((pre) => [...pre, value]);
            setCheckValues(value.toLowerCase());
        } else {
            setCheckValues("");
        }
    };
    console.log("checkValues:", checkValues);
    console.log("search:", search);

    return (
        <div className="mt-16 w-5/6">
            <div className="fixed">
                <div>
                    <p className="font-bold">Tìm kiếm theo nội dung</p>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs"
                        onChange={(e) => {
                            setSearch(e.target.value);
                            console.log(search);
                        }}
                    />
                </div>
                <div className="mt-8">
                    <p className="font-bold">Tìm kiếm theo loại hoạt động</p>
                    <div className="form-control mt-2">
                        <label className="label cursor-pointer">
                            <div className="flex justify-center items-center">
                                <span className="label-text">
                                    Tất cả hoạt động
                                </span>
                            </div>
                            <input
                                type="radio"
                                name="radio-10"
                                className="radio"
                                value=""
                                onChange={handleFilter}
                            />
                        </label>
                    </div>
                    {typeList.map((type, index) => {
                        return (
                            <div className="form-control mt-2">
                                <label className="label cursor-pointer">
                                    <div className="flex justify-center items-center">
                                        <span className="label-text">
                                            Hoạt động loại {index + 1}
                                        </span>
                                        <FaRegQuestionCircle
                                            className="font-thin ml-2 cursor-default"
                                            title={type}
                                        />
                                    </div>
                                    <input
                                        type="radio"
                                        name="radio-10"
                                        className="radio"
                                        value={type}
                                        // checked
                                        onChange={handleFilter}
                                    />
                                </label>
                            </div>
                        );
                    })}
                </div>
            </div>
            {[...newsFeeds]
                .reverse()
                .filter((item) => {
                    // return ;
                    return (
                        // checkValues.map((checkValue) => {
                        //     checkValue.toLowerCase() === ""
                        //         ? item
                        //         : item.type.toLowerCase().includes(search);
                        // }) ||
                        (checkValues.toLowerCase() === ""
                            ? item
                            : item.type.toLowerCase().includes(checkValues)) &&
                        (search.toLowerCase() === ""
                            ? item
                            : item.content.toLowerCase().includes(search))
                    );
                })
                .map((news, index) => {
                    return (
                        <div
                            key={index}
                            className=" flex flex-col items-center"
                        >
                            <div className="w-1/2 bg-white border-gray-300 border rounded-xl mb-4 relative">
                                <div className="dropdown absolute right-3 top-2 cursor-pointer">
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="btn p-1 min-h-0 h-auto bg-white border-none shadow-none"
                                    >
                                        <BsThreeDots />
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                                    >
                                        <li className="text-sm font-medium">
                                            <Link to={`/update/${news._id}`}>
                                                Update
                                            </Link>
                                        </li>
                                        <li
                                            className=" text-sm font-medium "
                                            onClick={(e) => {
                                                setId(news._id);
                                                handleShowModal(news._id);
                                            }}
                                        >
                                            <Link>Delete</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h1 className="m-4 mt-2 mb-0 font-bold text-lg">
                                        {news.title}
                                    </h1>
                                    <p className="m-4 mt-1 text-xs font-mediums text-gray-400">
                                        {extractTime(news.createdAt)}
                                        <span>
                                            {extractTime(news.createdAt) ==
                                            extractTime(news.updatedAt)
                                                ? ""
                                                : " (Edited)"}
                                        </span>
                                    </p>
                                    <p className="ml-4 font-bold text-xs italic text-indigo-600">
                                        {news.type}
                                    </p>
                                    <div className="m-4">{news.content}</div>
                                    <div className="flex flex-wrap rounded-b-xl overflow-hidden">
                                        {news.images.map((img, i) => {
                                            return (
                                                <img
                                                    src={img}
                                                    alt=""
                                                    className="max-w-full w-full"
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box flex flex-col items-center w-1/5">
                    <h3 className="font-bold text-lg mb-8 mt-4">
                        Delete this field?
                    </h3>
                    <div className="flex justify-around w-5/6 mb-4">
                        <button
                            className="btn btn-error "
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                        <button className="btn btn-active ">Cancel</button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default NewsFeed;
