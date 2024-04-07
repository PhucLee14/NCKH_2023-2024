import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="flex items-center justify-center h-12 bg-white z-40 fixed left-0 right-0 border-b-slate-300 border">
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
    );
};

export default Header;
