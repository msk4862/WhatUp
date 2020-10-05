import React from "react";
import "../styles/loader.css";

const Loader = ({ className, isOverlay }) => {
    return (
        <div className={`loader-container ${isOverlay && "overlay"}`}>
            <div className={`spinner-border loader ${className}`} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};
export default Loader;
