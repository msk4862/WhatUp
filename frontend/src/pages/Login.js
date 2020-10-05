import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import history from "../history";
import { authenticate, login } from "../redux/actions";
import "../styles/Login.css";
import { LOGIN_TITLE } from "../utilities/Constants";
import { isBlank, isEmptyObj } from "../utilities/dataValidation";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!props.authenticated) {
            let token = localStorage.getItem("jwtToken");
            if (token) props.authenticate(token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {
        location: { state },
    } = props;

    useEffect(() => {
        if (props.authenticated) {
            if (state && state.from) history.push(state.from);
            else history.push("/");
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
        return (
            errors.credential && (
                <p className="text-center error-message mb-2 mt-0">
                    {errors.credential}
                </p>
            )
        );
    }

    const { loading } = props.ui;
    // when user is done loading then only props.authenticated is set
    const { userLoading } = props;

    return (
        <div className="row justify-centent-center align-items-center">
            {userLoading && <Loader isOverlay />}
            {!userLoading && (
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
                                    autoComplete="on"
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
                                    autoComplete="on"
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

                            <div className="form-group row justify-content-center">
                                <button
                                    type="submit"
                                    className="btn d-flex flex-row"
                                    disabled={loading}
                                >
                                    Login
                                    {loading && (
                                        <div className="ml-1 mt-1 spinner-border spinner-border-sm" />
                                    )}
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
        userLoading: state.user.loading,
    };
};

export default connect(mapStateToProps, { login, authenticate })(Login);
