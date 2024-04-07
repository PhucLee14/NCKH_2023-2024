import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";

const NewsFeed = () => {
    const [newsFeeds, setNewsFeeds] = useState([]);
    const [id, setId] = useState("");
    const [displayDropdown, setDisplayDropdown] = useState(false);

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

    return (
        <div className="mt-16">
            {console.log(newsFeeds)}
            {newsFeeds.map((news, index) => {
                return (
                    <div key={index} className=" flex flex-col items-center">
                        <div className="w-1/2  bg-white border-gray-300 border rounded-xl mb-4 relative">
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
                                    <li className="pl-4 pr-10 pt-2 pb-2 text-sm font-medium hover:bg-slate-200">
                                        <Link to={`/update/${news._id}`}>
                                            Update
                                        </Link>
                                    </li>
                                    <li
                                        className="pl-4 pr-10 pt-2 pb-2 text-sm font-medium hover:bg-slate-200"
                                        onClick={(e) => {
                                            setId(news._id);
                                            handleShowModal(news._id);
                                        }}
                                    >
                                        Delete
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h1 className="m-4 mt-2 font-bold text-lg">
                                    {news.title}
                                </h1>
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
                    </div>
                );
            })}
            <button>
                button
                <Link to="/newsfeed" />
            </button>
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
