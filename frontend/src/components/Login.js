import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "../styles/Login.css";
import { login, clearAlert } from "../actions/index";
import history from "../history";
import { LOGIN_TITLE } from "../utilities/Constants";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        //navigating to home if logged in
        if (props.auth.isLoggedIn) {
            history.push("/");
        }

        if (props.alert.isError) {
            setAlert(props.alert.message);

            // workin as componentWillUnmount(), To clear alert
            return function cleanAlert() {
                props.clearAlert();
            };
        }
    });

    function onLogin(event) {
        event.preventDefault();
        const cred = {
            email: email,
            password: password,
        };
        props.login(cred);
    }

    function renderMessage() {
        /*
            rendering alert
        */
        const meta = {
            color: "red",
            symbol: "\u2715",
        };

        if (alert !== "") {
            const style = {
                color: `${meta.color}`,
                border: `2px solid ${meta.color}`,
            };
            return (
                <div className="row justify-content-center">
                    <p className="col-*" style={style}>
                        {meta.symbol} {alert}
                    </p>
                </div>
            );
        } else {
            return null;
        }
    }

    return (
        <div className="row justify-centent-center align-items-center">
            <div className="login-form-container col-10 col-sm-4 ml-auto mr-auto">
                <div className="text-center row justify-content-center">
                    <h2 className="col">{LOGIN_TITLE}</h2>
                </div>
                <form
                    className="row justify-content-center mt-4"
                    onSubmit={onLogin}
                >
                    <div className="col">
                        {renderMessage()}
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
                        </div>
                        <div className="form-group  row justify-content-center">
                            <button type="submit" className="btn">
                                Login
                            </button>
                        </div>
                    </div>
                </form>
                <div className="text-center">
                    Don't have an account ? <Link to="/signup"> Sign up here</Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.user.auth,
        alert: state.alert,
    };
};

export default connect(mapStateToProps, { login, clearAlert })(Login);
