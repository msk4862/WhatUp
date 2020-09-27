import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUser, authenticate } from "../actions/index";
import Blog from "../components/Blogs/Blog";
import StaticProfile from "../components/Profile/StaticProfile";
import CardSkeleton from "../components/Skeletons/CardSkeleton";
import ProfileSkeleton from "../components/Skeletons/ProfileSkeleton";

const User = (props) => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        props.fetchUser(props.match.params.handle);
    }, []);

    useEffect(() => {
        if (!props.authenticated) {
            let token = localStorage.getItem("jwtToken");
            if (token) props.authenticate(token);
        }
    }, []);

    const { loading, tempUser } = props.user;

    useEffect(() => {
        if (tempUser && tempUser.posts && tempUser.user) {
            setBlogs(tempUser.posts);
            setUser(tempUser.user);
        }
    }, [tempUser]);

    const renderBlogs = () => {
        if (loading) return <CardSkeleton />;
        if (blogs !== []) {
            return blogs.map((blog) => {
                return <Blog key={blog.postId} blog={blog} />;
            });
        } else {
            return <h2>No blogs yet written!</h2>;
        }
    };

    return (
        <div className="row justify-content-center mt-4">
            <section className="col-12 col-sm-3 order-sm-2">
                {!user && (
                    <div className="profile">
                        <ProfileSkeleton />
                    </div>
                )}
                {user && <StaticProfile profile={user} />}
            </section>
            <section className="col-12 col-sm-9 blogs-list">
                {renderBlogs()}
            </section>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps, { fetchUser, authenticate })(User);
