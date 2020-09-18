import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "../styles/Signup.css";
import { signup, authenticate } from "../actions";
import history from "../history";
import { SIGNUP_TITLE } from "../utilities/Constants";
import { isBlank, isEmptyObj } from "../utilities/dataValidation";

const Signup = (props) => {
    const [email, setEmail] = useState("");
    const [handle, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if(props.authenticated) history.push("/");
        else {
            let token = localStorage.getItem("jwtToken");
            if(token) props.authenticate(token);
        }
    }, []);

    useEffect(() => {
        if(props.ui.errors) setErrors(props.ui.errors);
    }, [props.ui.errors]);

    function Register(event) {
        event.preventDefault();
        const data = {
            email: email,
            handle: handle,
            password: password,
            confirmPassword: confirmPassword,
        };

        let credErrors = {};

        if(isBlank(data.email)) credErrors.email = "Email can't be blank!";
        if(isBlank(data.password)) credErrors.password = "Password can't be blank!";
        if(isBlank(data.confirmPassword)) credErrors.confirmPassword = "Confirm Password can't be blank!";
        if(isBlank(data.handle)) credErrors.handle = "Handle can't be blank!";        
        
        if(isEmptyObj(credErrors)) {
            props.signup(data);
            setErrors({});
        }
        else setErrors(credErrors);
    }

    function renderMessage() {
        if (errors.error) {
                return (
                    <p className="text-center error-message mb-2 mt-0">
                        {errors.error}
                    </p>
                );
            } 
        else return null;
    }

    return (
        <div className="row justify-centent-center align-items-center">
            <div className="signup-form-container col-10 col-sm-4 ml-auto mr-auto">
                <div className="text-center">
                    <h2>{SIGNUP_TITLE}</h2>
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
                                placeholder="Enter email"
                                value={email}
                                onChange={(event) => {
                                    event.preventDefault();
                                    setEmail(event.target.value);
                                }}
                            />
                            {errors.email ? <small className="error-message">{errors.email}</small> : null}  
                        </div>

                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter username"
                                value={handle}
                                onChange={(event) => {
                                    event.preventDefault();
                                    setUsername(event.target.value);
                                }}
                            />
                            {errors.handle ? <small className="error-message">{errors.handle}</small> : null}  
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(event) => {
                                    event.preventDefault();
                                    setPassword(event.target.value);
                                }}
                            />
                            {errors.password ? <small className="error-message">{errors.password}</small> : null}  
                        </div>
                        
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(event) => {
                                    event.preventDefault();
                                    setConfirmPassword(event.target.value);
                                }}
                            />
                        {errors.confirmPassword ? <small className="error-message">{errors.confirmPassword}</small> : null}                  
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
        authenticated: state.user.authenticated,
        ui: state.ui,
    };
};

export default connect(mapStateToProps, { signup, authenticate })(Signup);
