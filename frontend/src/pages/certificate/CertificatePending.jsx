import axios from "axios";
import React, { useEffect, useState } from "react";
import { extractTime } from "../../utils/extractTime";
import toast from "react-hot-toast";

const CertificatePending = () => {
    var localStorageData = localStorage.getItem("user");
    if (localStorageData) {
        var userData = JSON.parse(localStorageData);
    }
    const [id, setId] = useState("");
    const [certificates, setCertificates] = useState([]);
    const [status, setStatus] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:5000/certificate")
            .then((res) => setCertificates(res.data))
            .catch((err) => console.log(err));
    }, [certificates]);

    const handleStatus = (e) => {
        e.preventDefault();
        axios
            .put("http://localhost:5000/certificate/update/status/" + id, {
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

    // console.log(certificates);
    return (
        <div className="mt-16">
            {userData.isAdmin ? (
                certificates.map((certificate, index) => {
                    return certificate.status == "pending" ? (
                        <div
                            key={index}
                            className=" flex flex-col items-center"
                        >
                            <div className="w-1/2 bg-white border-gray-300 border rounded-xl mb-4 relative">
                                <div>
                                    <div className="flex m-4">
                                        <img
                                            src={
                                                certificate.authorId.profilePic
                                            }
                                            alt=""
                                            className="w-12 h-12 mr-2"
                                        />
                                        <div className="flex flex-col ">
                                            <p className="font-bold">
                                                {certificate.authorId.fullName}
                                            </p>
                                            <p className=" mt-1 text-xs font-mediums text-gray-400">
                                                {extractTime(
                                                    certificate.createdAt
                                                )}
                                                <span>
                                                    {extractTime(
                                                        certificate.createdAt
                                                    ) ==
                                                    extractTime(
                                                        certificate.updatedAt
                                                    )
                                                        ? ""
                                                        : " (Edited)"}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <h1 className="m-4 mt-2 mb-0 font-bold text-lg">
                                        {certificate.title}
                                    </h1>
                                    <p className="ml-4 font-bold text-xs italic text-indigo-600">
                                        {certificate.type}
                                    </p>
                                    <div className="m-4">
                                        {certificate.content}
                                    </div>
                                    <div>
                                        <div className="flex flex-wrap rounded-b-xl overflow-hidden">
                                            {certificate.images.map(
                                                (img, i) => {
                                                    return (
                                                        <img
                                                            src={img}
                                                            alt=""
                                                            className="max-w-full w-full"
                                                        />
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-around border-t">
                                        <button
                                            className="font-semibold p-4 hover:text-gray-500"
                                            onClick={(e) => {
                                                setStatus("approve");
                                                setId(certificate._id);
                                                handleStatus(e);
                                            }}
                                        >
                                            Chấp nhận
                                        </button>
                                        <button
                                            className="font-semibold p-4 hover:text-red-500"
                                            onClick={(e) => {
                                                setStatus("reject");
                                                setId(certificate._id);
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

export default CertificatePending;
