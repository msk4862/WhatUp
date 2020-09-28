import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchPost, editPost } from "../redux/actions";
import { isBlank, isEmptyObj } from "../utilities/dataValidation";

const PostEdit = (props) => {
    const [title, setTitle] = useState("");
    const [bodyMeta, setBodyMeta] = useState("");
    const [body, setBody] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        props.fetchPost(props.match.params.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (props.post) {
            const { body, bodyMeta } = props.post;
            setBodyMeta(bodyMeta);
            setBody(body);
        }
    }, [props.post]);

    useEffect(() => {
        if (props.errors) setErrors(props.errors);
    }, [props.errors]);

    function onEditBlog(event) {
        event.preventDefault();

        const post = {
            bodyMeta,
            body,
        };

        let err = {};
        if (isBlank(post.bodyMeta)) err.bodyMeta = "This can't be empty!";
        if (isBlank(post.body)) err.body = "This can't be empty!";

        if (isEmptyObj(err)) props.editPost(props.post.postId, post);

        setErrors(err);
    }

    return (
        <div className="container">
            <form className="blog-form mt-2" onSubmit={onEditBlog}>
                <h2>Edit your post</h2>
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
                    <label>Post Content</label>
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
        post: state.data.post,
    };
};

export default connect(mapStateToProps, { fetchPost, editPost })(PostEdit);
