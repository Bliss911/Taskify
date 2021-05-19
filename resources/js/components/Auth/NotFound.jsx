import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <>
            {" "}
            <div className="not_found_container">
                <div className="not_found_error">In Progress</div>

                <span className="not_found_info">
                    Page not found
                    <br /> This page is still a work in progress
                    <br />
                </span>
            </div>
        </>
    );
}

export default NotFound;
