import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { Button } from "../index";

function LogoutBtn() {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    
    const handleLogout = () => {
        setIsLoading(true);
        authService
            .logout()
            .then(() => {
                dispatch(logout());
            })
            .catch((error) => {
                console.error("Logout failed:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Button
            onClick={handleLogout}
            variant="outline"
            size="default"
            isLoading={isLoading}
            className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
            Logout
        </Button>
    );
}

export default LogoutBtn;
