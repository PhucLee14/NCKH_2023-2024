import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../logoutButton/LogoutButton";

const Header = () => {
    // Lấy dữ liệu từ local storage
    var localStorageData = localStorage.getItem("user");
    const [fullName, setFullName] = useState("");
    const [avt, setAvt] = useState("");
    const [check, setCheck] = useState(false);

    // Kiểm tra xem dữ liệu có tồn tại không
    if (localStorageData) {
        // Parse JSON thành đối tượng JavaScript
        var userData = JSON.parse(localStorageData);

        // Lấy giá trị của fullName từ đối tượng userData

        useEffect(() => {
            setFullName(userData.fullName);
            setAvt(userData.profilePic);
            setCheck(true);
        }, []);

        // Sử dụng giá trị fullName
        console.log(fullName);
    } else {
        console.log("Không tìm thấy dữ liệu trong local storage");
    }

    return (
        <div className="flex items-center justify-center h-12 bg-white z-40 fixed left-0 right-0 border-b-slate-300 border">
            <div className="flex justify-center">
                <Link to="/" className="font-bold mr-2 ml-2">
                    Home
                </Link>
                <Link to="/newsfeed" className="font-bold mr-2 ml-2">
                    News
                </Link>
                <Link to="/upload" className="font-bold mr-2 ml-2">
                    Upload
                </Link>
            </div>
            {check ? (
                <div className="absolute right-0 flex items-center mr-2">
                    <div className="relative dropdown cursor-pointer">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn p-1 min-h-0 h-auto bg-white border-none shadow-none hover:bg-transparent"
                        >
                            <span className="text-sm font-bold mr-2">
                                {fullName}
                            </span>
                            <img className="w-8 h-8" src={avt} alt="" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="absolute right-0 top-10 mt-1 dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box min-w-48"
                        >
                            <li className="text-sm font-medium">
                                <Link to={`/update/ `}>Trang cá nhân</Link>
                            </li>
                            <li className=" text-sm font-medium ">
                                <LogoutButton />
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="absolute right-0 flex items-center mr-2">
                    <Link to={"/login"} className="text-sm font-bold mr-2">
                        Đăng nhập
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;
