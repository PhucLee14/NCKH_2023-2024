import React from "react";
import Navbar from "../navbar/Navbar";

const AdminDefaultLayout = ({ children }) => {
    return (
        <div className="flex flex-col items-center bg-gray-100">
            <Navbar />
            <div className="w-full min-h-screen flex justify-center">
                {children}
            </div>
        </div>
    );
};

export default AdminDefaultLayout;
