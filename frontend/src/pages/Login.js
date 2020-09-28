import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login, authenticate } from "../actions/index";
import history from "../history";
import { LOGIN_TITLE } from "../utilities/Constants";
import Loader from "../components/Loader";
import { isBlank, isEmptyObj } from "../utilities/dataValidation";
import "../styles/Login.css";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const { from } = props.location.state || { from: { pathname: "/" } };

    useEffect(() => {
        if (props.authenticated) history.push(from);
        else {
            let token = localStorage.getItem("jwtToken");
            if (token) props.authenticate(token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.authenticated]);

    useEffect(() => {
        if (props.ui.errors) setErrors(props.ui.errors);
    }, [props.ui.errors]);

    function onLogin(event) {
        event.preventDefault();
        const cred = {
            email,
            password,
        };

        let credErrors = {};

        if (isBlank(cred.email)) credErrors.email = "Email can't be blank!";
        if (isBlank(cred.email))
            credErrors.password = "Password can't be blank!";

        if (isEmptyObj(credErrors)) {
            props.login(cred);
        }
        setErrors(credErrors);
    }

    // renders errors from server
    function renderErrors() {
        if (errors.credential) {
            return (
                <p className="text-center error-message mb-2 mt-0">
                    {errors.credential}
                </p>
            );
        } else return null;
    }

    return (
        <div className="row justify-centent-center align-items-center">
            {props.ui.loading && <Loader />}
            {!props.ui.loading && (
                <div className="login-form-container col-10 col-sm-4 ml-auto mr-auto">
                    <div className="text-center">
                        <h2>{LOGIN_TITLE}</h2>
                    </div>
                    <form
                        className="row justify-content-center mt-4"
                        onSubmit={onLogin}
                    >
                        <div className="col">
                            {renderErrors()}
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(event) => {
                                        event.preventDefault();
                                        setEmail(event.target.value);
                                    }}
                                />
                                {errors.email ? (
                                    <small className="error-message">
                                        {errors.email}
                                    </small>
                                ) : null}
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(event) => {
                                        event.preventDefault();
                                        setPassword(event.target.value);
                                    }}
                                />
                                {errors.password ? (
                                    <small className="error-message">
                                        {errors.password}
                                    </small>
                                ) : null}
                            </div>

                            <div className="form-group  row justify-content-center">
                                <button type="submit" className="btn">
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="text-center">
                        Don't have an account ?{" "}
                        <Link to="/signup"> Sign up here</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        authenticated: state.user.authenticated,
        ui: state.ui,
    };
};

export default connect(mapStateToProps, { login, authenticate })(Login);
