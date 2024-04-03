import axios from "axios";
import React, { useEffect, useState } from "react";

const NewsFeed = () => {
    const [newsFeeds, setNewsFeeds] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/newsfeed")
            .then((res) => setNewsFeeds(res.data))
            .catch((err) => console.log("loi ben frontend"));
    }, []);

    return (
        <div className="mt-16 flex flex-col items-center">
            {newsFeeds.map((news, index) => {
                return (
                    <div className="w-1/2 h-96 bg-white border-gray-300 border rounded-xl mb-4">
                        <h1 className="m-4 mt-2 font-bold text-lg">
                            {news.title}
                        </h1>
                        <p>{news.type}</p>
                        <div className="m-4">{news.content}</div>
                        <div className="flex flex-wrap">
                            {news.images.map((image, i) => {
                                return (
                                    <img
                                        src={image.url}
                                        alt={image.name}
                                        className="max-w-full w-1/3"
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default NewsFeed;
