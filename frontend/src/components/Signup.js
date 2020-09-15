import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "../styles/Signup.css";
import { signup, clearAlert } from "../actions";
import history from "../history";
import { SIGNUP_TITLE } from "../utilities/Constants";

const Signup = (props) => {
    const [email, setEmail] = useState("");
    const [handle, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alert, setAlert] = useState("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    function Register(event) {
        event.preventDefault();
        const data = {
            email: email,
            handle: handle,
            password: password,
            confirmPassword: confirmPassword,
        };

        props.signup(data);
    }

    function renderMessage() {
        /*
            rendering info message
        */
        if (alert !== "") {
            const meta = {
                color: "red",
                symbol: "\u2715",
            };

            const style = {
                color: `${meta.color}`,
                border: `2px solid ${meta.color}`,
            };
            return (
                <div className="error-message row justify-content-center">
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
            <div className="signup-form-container col-10 col-sm-4 ml-auto mr-auto">
                <div className="text-center row justify-content-center">
                    <h2 className="col-10 col-sm-6">{SIGNUP_TITLE}</h2>
                </div>
                <form
                    className="row justify-content-center mt-4"
                    onSubmit={Register}
                >
                    <div className="col">
                        {renderMessage()}
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                required
                                placeholder="Enter email"
                                value={email}
                                onChange={(event) => {
                                    event.preventDefault();
                                    setEmail(event.target.value);
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                placeholder="Enter username"
                                value={handle}
                                onChange={(event) => {
                                    event.preventDefault();
                                    setUsername(event.target.value);
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                required
                                placeholder="Enter password"
                                value={password}
                                onChange={(event) => {
                                    event.preventDefault();
                                    setPassword(event.target.value);
                                }}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                required
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(event) => {
                                    event.preventDefault();
                                    setConfirmPassword(event.target.value);
                                }}
                            />
                        </div>
                        <div className="signup-form button form-group row justify-content-center">
                            <button type="submit" className="btn">
                                Signup
                            </button>
                        </div>
                    </div>
                </form>
                <div className="text-center">
                    Already have an account ? <Link to="/login">Login here</Link>
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

export default connect(mapStateToProps, { signup, clearAlert })(Signup);
