import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchBlogs, login, authenticate } from "../../actions";
import Blog from "./Blog";

import "../../styles/Blogs/BlogList.css";

const BlogList = (props) => {
    useEffect(() => {
        let token = localStorage.getItem("jwtToken");
        if (token) props.authenticate(token);
    }, []);

    useEffect(() => {
        props.fetchBlogs();
    }, []);

    function renderBlogs() {
        const { blogs } = props;

        if (blogs != []) {
            if (props.location.pathname === "/blogs/my-blogs") {
                // render current user's blog only
                const user_id = props.auth.currentUserId;

                return blogs.map((blog) => {
                    if (blog.Author === user_id) {
                        return (
                            <Blog
                                key={blog.id}
                                id={blog.id}
                                title={blog.Title}
                                desc={blog.BodyMeta}
                                date={blog.DateCreated}
                                author={blog.Author}
                            />
                        );
                    }
                });
            } else {
                return blogs.map((blog) => {
                    return <Blog key={blog.postId} blog={blog} />;
                });
            }
        } else {
            return <h2>Loading...</h2>;
        }
    }

    return (
        <div className="container-fluid postlist">
            {props.loading && <p>Loading...</p>}
            {!props.loading && renderBlogs()}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        authenticated: state.user.authenticated,
        blogs: Object.values(state.blogs.blogs),
        loading: state.ui.loading,
    };
};
export default connect(mapStateToProps, { fetchBlogs, login, authenticate })(
    BlogList
);
