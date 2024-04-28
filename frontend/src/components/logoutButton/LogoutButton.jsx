import React from "react";
import useLogout from "../../hooks/useLogout";
import { Link } from "react-router-dom";

const LogoutButton = () => {
    const { loading, logout } = useLogout();

    return (
        <div className="mt-auto">
            {!loading ? (
                <Link onClick={logout}>Đăng xuất</Link>
            ) : (
                <span className="loading loading-spinner"></span>
            )}
        </div>
    );
};

export default LogoutButton;
