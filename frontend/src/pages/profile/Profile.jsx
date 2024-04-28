import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { extractTime } from "../../utils/extractTime";

const Profile = () => {
    var localStorageData = localStorage.getItem("user");
    const [certificates, setCertificates] = useState([]);
    const [newsfeeds, setNewsfeeds] = useState([]);
    const [fullName, setFullName] = useState("");
    const [avt, setAvt] = useState("");
    const [isCertificate, setIsCertificate] = useState(true);
    const [id, setId] = useState("");
    const [check, setCheck] = useState(false);
    if (localStorageData) {
        // Parse JSON thành đối tượng JavaScript
        var userData = JSON.parse(localStorageData);

        // Lấy giá trị của fullName từ đối tượng userData

        useEffect(() => {
            setFullName(userData.fullName);
            setAvt(userData.profilePic);
            setId(userData._id);
            setCheck(true);
        }, []);

        useEffect(() => {
            axios
                .get("http://localhost:5000/certificate/" + userData._id)
                .then((res) => setCertificates(res.data))
                .catch((err) => console.log("loi ben frontend"));
        }, [certificates]);

        useEffect(() => {
            axios
                .get("http://localhost:5000/getnews/author/" + userData._id)
                .then((res) => setNewsfeeds(res.data));
            // .catch((err) => console.log(err));
        }, []);
    } else {
        console.log("Không tìm thấy dữ liệu trong local storage");
    }

    const handleDeleteCertificate = (certificateId) => {
        axios
            .delete("http://localhost:5000/certificate/delete/" + certificateId)
            .then((res) => {
                toast.success("Delete success!");
                // window.location.reload();
            })
            .then((err) => {
                console.log(err);
            });
    };
    return (
        <div className="mt-12 bg-white w-1/2 ">
            <div className="flex m-4 pb-4 border-b">
                <img src={avt} alt="" className="w-36 h-36" />
                <div className="ml-4">
                    <p className="text-xl">{fullName}</p>
                    <button className="bg-slate-200 py-2 px-4 rounded-xl font-semibold mt-4">
                        Chỉnh sửa thông tin
                    </button>
                </div>
            </div>
            <div className="flex justify-evenly border-b">
                {isCertificate ? (
                    <>
                        <button
                            className={`border-b-2 p-2 border-black font-semibold text-sm`}
                            onClick={(e) => {
                                e.preventDefault();
                                setIsCertificate(true);
                                console.log(isCertificate);
                            }}
                        >
                            MINH CHỨNG
                        </button>
                        <button
                            className={`border-b-2 p-2 border-transparent font-semibold text-sm`}
                            onClick={(e) => {
                                e.preventDefault();
                                setIsCertificate(false);
                                console.log(isCertificate);
                            }}
                        >
                            BÀI ĐĂNG
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className={`border-b-2 p-2 border-transparent font-semibold text-sm`}
                            onClick={(e) => {
                                e.preventDefault();
                                setIsCertificate(true);
                                console.log(isCertificate);
                            }}
                        >
                            MINH CHỨNG
                        </button>
                        <button
                            className={`border-b-2 p-2 border-black font-semibold text-sm`}
                            onClick={(e) => {
                                e.preventDefault();
                                setIsCertificate(false);
                                console.log(isCertificate);
                            }}
                        >
                            BÀI ĐĂNG
                        </button>
                    </>
                )}
            </div>
            <div className="flex items-center flex-col h-1/2">
                {isCertificate ? (
                    certificates.length != 0 ? (
                        certificates.map((certificate) => {
                            return (
                                <div className=" flex justify-between w-full p-4 border-b ">
                                    <p className="font-bold">
                                        {certificate.title}
                                    </p>
                                    <div>
                                        <i class="fa-solid fa-pen mr-8 cursor-pointer"></i>
                                        <i
                                            class="fa-solid fa-circle-xmark cursor-pointer"
                                            onClick={(e) => {
                                                handleDeleteCertificate(
                                                    certificate._id
                                                );
                                            }}
                                        ></i>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                            <i class="fa-solid fa-file-lines text-[80px]"></i>
                            <p className="mt-4 text-xl">Không có minh chứng</p>
                        </div>
                    )
                ) : newsfeeds.length != 0 ? (
                    newsfeeds.map((newsfeed) => {
                        return (
                            <div className=" flex justify-between w-full p-4 border-b items-center">
                                <div>
                                    <p className="font-bold">
                                        {newsfeed.title}
                                    </p>
                                    <p className=" mt-1 text-xs font-mediums text-gray-400">
                                        {extractTime(newsfeed.createdAt)}
                                    </p>
                                </div>
                                <div>
                                    <i class="fa-solid fa-pen mr-8 cursor-pointer"></i>
                                    <i class="fa-solid fa-circle-xmark cursor-pointer"></i>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                        <i class="fa-solid fa-memo-pad text-[80px]"></i>
                        <p className="mt-4 text-xl">Không có bài đăng</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
