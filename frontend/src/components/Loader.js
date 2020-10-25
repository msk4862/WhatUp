import React from "react";
import "../styles/loader.css";

const Loader = () => (
    <div className="loader-overlay">
        <div className="loader spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
);

export default Loader;
