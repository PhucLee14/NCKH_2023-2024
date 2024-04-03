import React from "react";
import Header from "../header/Header";

const DefaultLayout = ({ children }) => {
    return (
        <div className="flex flex-col items-center bg-gray-100">
            <Header />
            <div className="w-5/6 min-h-screen">{children}</div>
        </div>
    );
};

export default DefaultLayout;
