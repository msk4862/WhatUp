import React, { useEffect } from "react";
import { connect } from "react-redux";
import { authenticate } from "../actions";
import BlogList from "../components/Blogs/BlogList";
import "../styles/Home.css";
import Profile from "../components/Profile/Profile";

const Home = (props) => {
    useEffect(() => {
        if (!props.authenticated) {
            let token = localStorage.getItem("jwtToken");
            if (token) props.authenticate(token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="row justify-content-center mt-4">
            <section className="col-12 col-sm-3 order-sm-2">
                <Profile />
            </section>
            <section className="col-12 col-sm-9 blogs-list">
                <BlogList />
            </section>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        authenticated: state.user.authenticated,
    };
};
export default connect(mapStateToProps, { authenticate })(Home);
