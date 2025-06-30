import React from "react";

function Logo({ width = "50px", height = "30px"}) {
    // Use import.meta.env.BASE_URL to handle the base path properly in production
    const logoPath = `${import.meta.env.BASE_URL}logo.png`;
    
    return (
        <>
            <img src={logoPath} alt="Logo" width={width} height={height} className="rounded-md"/>
        </>
    )
}

export default Logo;
