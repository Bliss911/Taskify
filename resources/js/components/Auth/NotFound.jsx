import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <>
            {" "}
            <div className="not_found_container">
                <div className="not_found_error">404</div>

                <span className="not_found_info">
                    Page not found
                    <br /> Our developers may be tired or sleeping at the
                    moment.
                    <br />
                    Let's go<Link to="/"> home</Link> and try from there.
                </span>
            </div>
        </>
    );
}

export default NotFound;
