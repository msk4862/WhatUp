import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchBlogs, login, authenticate } from "../../actions";
import Blog from "./Blog";

import "../../styles/Blogs/BlogList.css";

const BlogList = (props) => {

    useEffect(() => {
        let token = localStorage.getItem("jwtToken");
        if(token) props.authenticate(token);
    }, []);

    useEffect(() => {
        props.fetchBlogs();
    }, []);

    function renderBlogs() {
        if (props.blogs != []) {
            if (
                (props.location.pathname === "/blogs/my-blogs")            ) {
                // render current user's blog only
                const user_id = props.auth.currentUserId;

                return props.blogs.map((blog) => {
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
                return props.blogs.map((blog) => {
                    return (
                        <Blog
                            key={blog.postId}
                            id={blog.postId}
                            title={blog.bodyMeta}
                            desc={blog.bodyMeta}
                            date={blog.createdAt}
                            likeCount={blog.likeCount}
                            commentCount={blog.commentCount}
                            userImage={blog.userImage}
                            author={blog.userHandle}
                        />
                    );
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
    )
};

const mapStateToProps = (state) => {
    return {
        authenticated: state.user.authenticated,
        blogs: Object.values(state.blogs),
        loading: state.ui.loading, 
    };
};
export default connect(mapStateToProps, { fetchBlogs, login, authenticate })(BlogList);
