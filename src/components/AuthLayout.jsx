import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(
        () => {
            /* simpler version
            // if(authStatus === true){
            //     navigate("/")
            // }
            // else if(authStatus === false){
            //     navigate("/login")
            // }
        */

            //hard to understand this but not very hard
            if (authentication && authentication !== authStatus) {
                navigate("/login");
            } else if (!authentication && authentication !== authStatus) {
                navigate("/");
            }
            setLoader(false);
        },
        [authStatus,
        navigate,
        authentication]
    );

    return loader ? (
        <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
    ) : (
        <>{children}</>
    );
}
