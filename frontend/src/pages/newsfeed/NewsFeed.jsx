import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { extractTime } from "../../utils/extractTime";

const NewsFeed = () => {
    const [newsFeeds, setNewsFeeds] = useState([]);
    const [id, setId] = useState("");
    const [search, setSearch] = useState("");
    const [checkValues, setCheckValues] = useState("");
    const formattedTime = extractTime(newsFeeds.createdAt);
    var localStorageData = localStorage.getItem("user");
    if (localStorageData) {
        var userData = JSON.parse(localStorageData);
    }

    const typeList = [
        "activity1",
        "activity2",
        "activity3",
        "activity4",
        "activity5",
    ];

    useEffect(() => {
        axios
            .get("http://localhost:5000/newsfeed")
            .then((res) => setNewsFeeds(res.data))
            .catch((err) => console.log(err));
    }, [newsFeeds]);

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
                // window.location.reload();
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

    return (
        <div className="mt-16 w-5/6">
            <div className="fixed">
                {userData.isAdmin ? (
                    <div className=" mb-8 mt-4">
                        <Link
                            to={"/newsfeed/pending"}
                            className="p-2 px-4 bg-indigo-600 text-white rounded-xl"
                        >
                            Bài viết chờ duyệt
                        </Link>
                    </div>
                ) : (
                    ""
                )}

                <div>
                    <p className="font-bold mb-2">Tìm kiếm theo nội dung</p>
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
                                        <i
                                            class="fa-regular fa-circle-question font-bold ml-2 cursor-default"
                                            title={type}
                                        ></i>
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
                    // console.log(item.type);
                    return (
                        // checkValues.map((checkValue) => {
                        //     checkValue.toLowerCase() === ""
                        //         ? item
                        //         : item.type.toLowerCase().includes(search);
                        // }) ||
                        (item.type
                            ? checkValues.toLowerCase() === ""
                                ? item
                                : item.type.toLowerCase().includes(checkValues)
                            : "") &&
                        (search.toLowerCase() === ""
                            ? item
                            : item.content.toLowerCase().includes(search))
                    );
                })
                .map((news, index) => {
                    return news.status == "approve" && news.author ? (
                        <div
                            key={index}
                            className=" flex flex-col items-center"
                        >
                            <Link
                                to={`/newsfeed/${news._id}`}
                                className="w-1/2 bg-white border-gray-300 border rounded-xl mb-4 relative cursor-pointer"
                            >
                                <div className="dropdown absolute right-3 top-2 cursor-pointer">
                                    {userData ? (
                                        userData._id == news.author._id ||
                                        userData.isAdmin ? (
                                            <div
                                                tabIndex={0}
                                                role="button"
                                                className="btn p-1 min-h-0 h-auto bg-white border-none shadow-none"
                                                onClick={(e) =>
                                                    e.preventDefault()
                                                }
                                            >
                                                <i class="fa-solid fa-ellipsis"></i>
                                            </div>
                                        ) : (
                                            <div className="hidden"></div>
                                        )
                                    ) : (
                                        ""
                                    )}

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
                                    <div className="flex m-4">
                                        <img
                                            src={news.author.profilePic}
                                            alt=""
                                            className="w-12 h-12 mr-2"
                                        />
                                        <div className="flex flex-col ">
                                            <p className="font-bold">
                                                {news.author.fullName}
                                            </p>
                                            <p className=" mt-1 text-xs font-mediums text-gray-400">
                                                {extractTime(news.createdAt)}
                                                <span>
                                                    {extractTime(
                                                        news.createdAt
                                                    ) ==
                                                    extractTime(news.updatedAt)
                                                        ? ""
                                                        : " (Edited)"}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <h1 className="m-4 mt-2 mb-0 font-bold text-lg">
                                        {news.title}
                                    </h1>
                                    <p className="ml-4 font-bold text-xs italic text-indigo-600">
                                        Hoạt động thuộc mục {news.name}
                                    </p>
                                    <div className="m-4">{news.content}</div>
                                    <div>
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
                                    <div></div>
                                </div>
                            </Link>
                        </div>
                    ) : (
                        ""
                    );
                })}
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box flex flex-col items-center w-1/5 p-2 pt-4">
                    <h3 className="font-bold text-lg mb-8">
                        Xóa bài viết này?
                    </h3>
                    <div className="flex flex-col justify-around items-center w-5/6 ">
                        <button
                            className="btn btn-error mb-2"
                            onClick={handleDelete}
                        >
                            Xóa bài viết
                        </button>
                        {/* <p className="text-xs text-slate-400">
                            Click ra ngoài để hủy
                        </p> */}
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
