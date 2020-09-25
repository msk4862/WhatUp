import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";

const ProtectedRoute = ({ component: Component, authenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                authenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

const mapStateToProps = (state) => {
    return { authenticated: state.user.authenticated };
};

export default connect(mapStateToProps, null)(ProtectedRoute);
