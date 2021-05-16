import React, { useEffect, useState } from "react";
function PageLoader() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    return (
        <>
            {loading ? (
                <div className="content">
                    <div className="loading qfont">
                        <p>Loading</p>
                        <span></span>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default PageLoader;
