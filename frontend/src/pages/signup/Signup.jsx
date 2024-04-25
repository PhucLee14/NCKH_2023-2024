import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        userName: "",
        password: "",
        confirmPassword: "",
        gender: "male",
    });

    const { loading, signup } = useSignup();

    const handleCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        await signup(inputs);
        console.log(inputs);
    };
    return (
        <div className="h-screen w-screen bg-slate-200 flex justify-center items-center">
            <div className="border border-gray-200 rounded-2xl p-8 bg-slate-100 shadow-2xl">
                <h1 className="text-3xl font-semibold text-center text-gray-600">
                    Signup
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4 mb-4">
                        <span className="text-base label-text text-gray-500">
                            Tên người dùng
                        </span>
                        <input
                            type="text"
                            placeholder="Nhập tên ngươi dùng"
                            className="w-full input input-bordered h-10 mt-2"
                            onChange={(e) => {
                                setInputs({
                                    ...inputs,
                                    fullName: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="mt-4 mb-4">
                        <span className="text-base label-text text-gray-500">
                            Tên tài khoản
                        </span>
                        <input
                            type="text"
                            placeholder="Nhập tên tài khoản"
                            className="w-full input input-bordered h-10 mt-2"
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    userName: e.target.value,
                                })
                            }
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
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="mt-4 mb-4">
                        <label>
                            <span className="text-base label-text text-gray-500">
                                Xác nhận mật khẩu
                            </span>
                        </label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu"
                            className="w-full input input-bordered h-10 mt-2"
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    confirmPassword: e.target.value,
                                })
                            }
                        />
                    </div>
                    <Link to={"/login"}>Have an account?</Link>
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

export default Signup;
