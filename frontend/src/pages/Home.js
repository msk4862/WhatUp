import React, { useEffect } from "react";
import { connect } from "react-redux";
import { authenticate } from "../redux/actions";
import Profile from "../components/Profile/Profile";
import PostList from "../components/Posts/PostList";
import "../styles/Home.css";

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
                <PostList />
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
