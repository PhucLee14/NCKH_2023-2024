import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

const NewsTag = ({}) => {
    const [displayDropdown, setDisplayDropdown] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:5000/newsfeed")
            .then((res) => setNewsFeeds(res.data))
            .catch((err) => console.log("loi ben frontend"));
    }, []);

    const handleSubmenu = () => {};
    return (
        <div className="w-1/2  bg-white border-gray-300 border rounded-xl mb-4 relative">
            <div className="absolute right-3 top-2 cursor-pointer">
                <BsThreeDots
                    onClick={handleSubmenu}
                    className="absolute right-0 top-0"
                />
                {displayDropdown && (
                    <ul className=" bg-white rounded-md absolute -right-20 top-4 flex flex-col shadow-md border border-slate-200 pt-2 pb-2 ">
                        <li className="pl-4 pr-10 pt-2 pb-2 text-sm font-medium hover:bg-slate-200">
                            Update
                        </li>
                        <li className="pl-4 pr-10 pt-2 pb-2 text-sm font-medium hover:bg-slate-200">
                            Delete
                        </li>
                    </ul>
                )}
            </div>
            <div>
                <h1 className="m-4 mt-2 font-bold text-lg">{news.title}</h1>
                <p className="ml-4 font-bold text-xs italic text-indigo-600">
                    {news.type}
                </p>
                <div className="m-4">{news.content}</div>
                <div className="flex flex-wrap">
                    {/* {news.images.map((image, i) => {
            return ( */}
                    <img
                        src={news.images}
                        alt=""
                        className="max-w-full w-1/3"
                    />
                    {/* ); */}
                    {/* })} */}
                </div>
            </div>
        </div>
    );
};

export default NewsTag;
