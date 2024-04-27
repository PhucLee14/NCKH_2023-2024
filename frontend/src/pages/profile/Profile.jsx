import React, { useEffect, useState } from "react";

const Profile = () => {
    var localStorageData = localStorage.getItem("user");
    const [fullName, setFullName] = useState("");
    const [avt, setAvt] = useState("");
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

        // Sử dụng giá trị fullName
        console.log(fullName);
    } else {
        console.log("Không tìm thấy dữ liệu trong local storage");
    }
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
            <div className="flex justify-center items-center">
                <p>Không có minh chứng</p>
            </div>
        </div>
    );
};

export default Profile;
