import React from "react";
import Header from "../header/Header";

const DefaultLayout = ({ children }) => {
    return (
        <div className="flex flex-col items-center bg-gray-100">
            <Header />
            <div className="w-full min-h-screen flex justify-center">
                {children}
            </div>
        </div>
    );
};

export default DefaultLayout;
