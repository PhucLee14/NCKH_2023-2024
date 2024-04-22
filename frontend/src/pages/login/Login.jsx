import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://apiportalstudent7mobile.utc2.edu.vn/api/v1/auth/login",
                { Email: email, Password: password }
            );
            console.log(res);
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="h-screen w-screen bg-slate-200 flex justify-center items-center">
            <div className="border border-gray-200 rounded-2xl p-8 bg-slate-100 shadow-2xl">
                <h1 className="text-3xl font-semibold text-center text-gray-600">
                    Login
                </h1>
                <form onSubmit={handleLogin}>
                    <div className="mt-4 mb-4">
                        <span className="text-base label-text text-gray-500">
                            Mã số sinh viên
                        </span>
                        <input
                            type="text"
                            placeholder="Nhập mã số sinh viên"
                            className="w-full input input-bordered h-10 mt-2"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mt-4 mb-4">
                        <label>
                            <span className="text-base label-text text-gray-500">
                                Mật khẩu
                            </span>
                        </label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu"
                            className="w-full input input-bordered h-10 mt-2"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="btn btn-block bg-indigo-700 btn-sm mt-2 hover:bg-indigo-400 text-white">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
