import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { extractTime } from "../../utils/extractTime";

const NewsPending = () => {
    var localStorageData = localStorage.getItem("user");
    if (localStorageData) {
        var userData = JSON.parse(localStorageData);
    }
    const [id, setId] = useState("");
    const [newsFeeds, setNewsFeeds] = useState([]);
    const [status, setStatus] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:5000/newsfeed")
            .then((res) => setNewsFeeds(res.data))
            .catch((err) => console.log(err));
    }, [newsFeeds]);

    const handleStatus = (e) => {
        e.preventDefault();
        axios
            .put("http://localhost:5000/update/status/" + id, {
                status,
            })
            .then((res) => {
                toast.success("Done");
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // console.log(userData);

    return (
        // {userData.isAdmin ? (<p></p>) : (<p></p>)}
        <div className="mt-16 w-5/6">
            {userData.isAdmin ? (
                newsFeeds.map((news, index) => {
                    return news.status == "pending" ? (
                        <div
                            key={index}
                            className=" flex flex-col items-center"
                        >
                            <div className="w-1/2 bg-white border-gray-300 border rounded-xl mb-4 relative">
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
                                    <div className="flex justify-around border-t">
                                        <button
                                            className="font-semibold p-4 hover:text-gray-500"
                                            onClick={(e) => {
                                                setStatus("approve");
                                                setId(news._id);
                                                handleStatus(e);
                                            }}
                                        >
                                            Chấp nhận
                                        </button>
                                        <button
                                            className="font-semibold p-4 hover:text-red-500"
                                            onClick={(e) => {
                                                setStatus("reject");
                                                setId(news._id);
                                                handleStatus(e);
                                            }}
                                        >
                                            Từ chối
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    );
                })
            ) : (
                <div className="h-full w-full flex flex-col justify-center items-center">
                    <i class="fa-solid fa-square-a-lock text-[90px] mb-8"></i>
                    <p className="text-2xl font-semibold">
                        Trang không khả dụng
                    </p>
                </div>
            )}
        </div>
    );
};

export default NewsPending;
