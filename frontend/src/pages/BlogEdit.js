import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchBlog, editBlog } from "../actions";
import { isBlank, isEmptyObj } from "../utilities/dataValidation";

const BlogEdit = (props) => {
    const [title, setTitle] = useState("");
    const [bodyMeta, setBodyMeta] = useState("");
    const [body, setBody] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        props.fetchBlog(props.match.params.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (props.blog) {
            const { body, bodyMeta } = props.blog;
            setBodyMeta(bodyMeta);
            setBody(body);
        }
    }, [props.blog]);

    useEffect(() => {
        if (props.errors) setErrors(props.errors);
    }, [props.errors]);

    function onEditBlog(event) {
        event.preventDefault();

        const blog = {
            bodyMeta,
            body,
        };

        let err = {};
        if (isBlank(blog.bodyMeta)) err.bodyMeta = "This can't be empty!";
        if (isBlank(blog.body)) err.body = "This can't be empty!";

        if (isEmptyObj(err)) props.editBlog(props.blog.postId, blog);

        setErrors(err);
    }

    return (
        <div className="container">
            <form className="blog-form mt-2" onSubmit={onEditBlog}>
                <h2>Edit your blog</h2>
                <div className="form-group mt-4">
                    <label>Title</label>
                    <textarea
                        type="textarea"
                        className="form-control"
                        rows="2"
                        value={title}
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                    ></textarea>
                    {errors.title ? (
                        <small className="error-message">{errors.title}</small>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Short Description</label>
                    <textarea
                        type="textarea"
                        className="form-control"
                        rows="5"
                        value={bodyMeta}
                        onChange={(event) => {
                            setBodyMeta(event.target.value);
                        }}
                    ></textarea>
                    {errors.bodyMeta ? (
                        <small className="error-message">
                            {errors.bodyMeta}
                        </small>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Blog Content</label>
                    <textarea
                        type="textarea"
                        className="form-control"
                        rows="10"
                        value={body}
                        onChange={(event) => {
                            setBody(event.target.value);
                        }}
                    ></textarea>
                    {errors.body ? (
                        <small className="error-message">{errors.body}</small>
                    ) : null}
                </div>
                <div className="form-group row justify-content-center">
                    <button type="submit" className="btn">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        authenticated: state.user.authenticated,
        blog: state.data.blog,
    };
};

export default connect(mapStateToProps, { fetchBlog, editBlog })(BlogEdit);
