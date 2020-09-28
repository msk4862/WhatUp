import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createBlog } from "../actions";
import { isBlank, isEmptyObj } from "../utilities/dataValidation";

const BlogCreate = (props) => {
    const [title, setTitle] = useState("");
    const [bodyMeta, setBodyMeta] = useState("");
    const [body, setBody] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (props.errors) setErrors(props.errors);
    }, [props.errors]);

    function onCreateBlog(event) {
        event.preventDefault();

        const blog = {
            bodyMeta,
            body,
        };

        let err = {};
        if (isBlank(blog.bodyMeta)) err.bodyMeta = "this can't be empty!";
        if (isBlank(blog.body)) err.body = "This can't be empty!";

        if (isEmptyObj(err)) props.createBlog(blog);

        setErrors(err);
    }

    return (
        <div className="container">
            <form className="blog-create-form mt-2" onSubmit={onCreateBlog}>
                <h2>Create a new blog</h2>
                <div className="form-group mt-4">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    ></input>
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
                        onChange={(event) => setBodyMeta(event.target.value)}
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
                        onChange={(event) => setBody(event.target.value)}
                    ></textarea>
                    {errors.body ? (
                        <small className="error-message">{errors.body}</small>
                    ) : null}
                </div>

                <div className="form-group row justify-content-center">
                    <button type="submit" className="btn">
                        Publish Blog
                    </button>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        authenticated: state.user.authenticated,
        errors: state.ui.errors,
    };
};
export default connect(mapStateToProps, { createBlog })(BlogCreate);
