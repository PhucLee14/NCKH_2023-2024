import axios from "axios";
import React, { useEffect, useState } from "react";
import { extractTime } from "../../utils/extractTime";
import { useParams } from "react-router-dom";

const NewsDetail = () => {
    const { id } = useParams();
    const [newsFeed, setNewsFeed] = useState([]);
    const [comments, setComments] = useState([]);
    var localStorageData = localStorage.getItem("user");
    if (localStorageData) {
        var userData = JSON.parse(localStorageData);
    }

    useEffect(() => {
        axios
            .get("http://localhost:5000/getNews/" + id)
            .then((res) => setNewsFeed(res.data))
            .catch((err) => console.log("loi ben frontend"));
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:5000/comments/" + id)
            .then((res) => setComments(res.data))
            .catch((err) => console.log("loi ben frontend"));
    }, []);

    console.log(newsFeed);
    console.log(comments);
    return (
        <div className="mt-16  m-4 w-screen flex justify-center">
            <div className="w-1/3 bg-white border-r">
                <div className="flex m-4">
                    {/* <img
                        src={newsFeed.author.profilePic}
                        alt=""
                        className="w-12 h-12 mr-2"
                    />
                    <div className="flex flex-col ">
                        <p className="font-bold">{newsFeed.author.fullName}</p>
                        <p className=" mt-1 text-xs font-mediums text-gray-400">
                            {extractTime(newsFeed.createdAt)}
                            <span>
                                {extractTime(newsFeed.createdAt) ==
                                extractTime(newsFeed.updatedAt)
                                    ? ""
                                    : " (Edited)"}
                            </span>
                        </p>
                    </div> */}
                </div>
                <h1 className="m-4 mt-2 mb-0 font-bold text-lg">
                    {newsFeed.title}
                </h1>
                <p className="ml-4 font-bold text-xs italic text-indigo-600">
                    {newsFeed.type}
                </p>
                <div className="m-4">{newsFeed.content}</div>
                <div className="flex flex-wrap rounded-b-xl overflow-hidden">
                    <img
                        src={newsFeed.images}
                        alt=""
                        className="max-w-full w-full"
                    />
                </div>
            </div>
            <div className="w-1/4 bg-white p-4">
                {comments.map((comment) => {
                    return (
                        <div className="flex mb-8">
                            <img
                                src={comment.senderId.profilePic}
                                alt=""
                                className="w-10 h-10 mr-4"
                            />
                            <div>
                                <span className="font-bold mr-2">
                                    {comment.senderId.fullName}
                                </span>
                                <span className="text-sm">
                                    {comment.content}
                                </span>
                                <p className=" mt-1 text-xs font-mediums text-gray-400">
                                    {extractTime(comment.createdAt)}
                                    {/* <span>
                                        {extractTime(newsFeed.createdAt) ==
                                        extractTime(newsFeed.updatedAt)
                                            ? ""
                                            : " (Edited)"}
                                    </span> */}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NewsDetail;
