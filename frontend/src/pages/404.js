import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/404.css";
import { APP_TITLE } from "../utilities/Constants";

const ErrorPage = () => {
    // setting page title
    useEffect(() => {
        document.title = `Page not found · ${APP_TITLE}`;
    }, []);

    return (
        <div className="not-found">
            <h1>404</h1>
            <h5>Page not found!</h5>
            <Link className="mt-4" to="/">
                Go to home
            </Link>
        </div>
    );
};

export default ErrorPage;
