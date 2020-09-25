import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchBlogs, login, authenticate } from "../../actions";
import Blog from "./Blog";

const BlogList = (props) => {
    useEffect(() => {
        props.fetchBlogs();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { blogs, loading } = props.data;

    function renderBlogs() {
        const blogsValues = Object.values(blogs);

        if (blogsValues !== []) {
            return blogsValues.map((blog) => {
                return <Blog key={blog.postId} blog={blog} />;
            });
        } else {
            return <h2>No blogs yet!</h2>;
        }
    }

    return (
        <div>
            {loading && <p>Loading...</p>}
            {!loading && renderBlogs()}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        data: state.data,
    };
};
export default connect(mapStateToProps, { fetchBlogs, login, authenticate })(
    BlogList
);
