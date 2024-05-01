import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { extractTime } from "../../utils/extractTime";
import { deleteNewsfeedApi, fetchNewsfeedApi } from "../../api";

const NewsFeed = () => {
  const [newsFeeds, setNewsFeeds] = useState([]);
  const [id, setId] = useState("");
  const [displayDropdown, setDisplayDropdown] = useState(false);

  const formattedTime = extractTime(newsFeeds.createdAt);

  useEffect(() => {
    fetchNewsfeedApi.then((data) => setNewsFeeds(data));
  }, []);

  const handleShowModal = (id) => {
    document.getElementById("my_modal_2").showModal();
    console.log(id);
  };

  const handleDelete = () => {
    console.log(id);
    deleteNewsfeedApi(id).then((res) => {
      document.getElementById("my_modal_2").style.display = "none";
      toast.success("Delete success!");
      window.location.reload();
    });
  };

  return (
    <div className="mt-16">
      {console.log(newsFeeds)}
      {newsFeeds.map((news, index) => {
        return (
          <div key={index} className=" flex flex-col items-center">
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
                    <Link to={`/update/${news._id}`}>Update</Link>
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
                    {extractTime(news.createdAt) == extractTime(news.updatedAt)
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
                      <img src={img} alt="" className="max-w-full w-1/3" />
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
          <h3 className="font-bold text-lg mb-8 mt-4">Delete this field?</h3>
          <div className="flex justify-around w-5/6 mb-4">
            <button className="btn btn-error " onClick={handleDelete}>
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
