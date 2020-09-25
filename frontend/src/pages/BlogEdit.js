import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchBlog, editBlog } from "../actions";
import history from "../history";

const BlogEdit = (props) => {
    const [title, setTitle] = useState("");
    const [shortDesc, setShortDesc] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        if (props.blog) {
            const { Title, Body, BodyMeta } = props.blog;
            setTitle(Title);
            setShortDesc(BodyMeta);
            setBody(Body);
        }
    }, []);

    function onEditBlog(event) {
        event.preventDefault();

        const user_id = props.auth.currentUserId;

        const blog = {
            Title: title,
            BodyMeta: shortDesc,
            Body: body,
            Author: user_id,
        };
        props.editBlog(props.blog.id, blog);
    }

    return (
        <form className="blog-form" onSubmit={onEditBlog}>
            <div className="form-group">
                <label>Title</label>
                <textarea
                    type="textarea"
                    className="form-control"
                    rows="2"
                    required
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                ></textarea>
            </div>
            <div className="form-group">
                <lable>Short Description</lable>
                <textarea
                    type="textarea"
                    className="form-control"
                    rows="5"
                    required
                    value={shortDesc}
                    onChange={(event) => {
                        setShortDesc(event.target.value);
                    }}
                ></textarea>
            </div>
            <div className="form-group">
                <lable>Blog Content</lable>
                <textarea
                    type="textarea"
                    className="form-control"
                    rows="10"
                    required
                    value={body}
                    onChange={(event) => {
                        setBody(event.target.value);
                    }}
                ></textarea>

                <div className="form-group row justify-content-center">
                    <button type="submit" className="btn">
                        Save Changes
                    </button>
                </div>
            </div>
        </form>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.user.auth,
        blog: state.blogs[ownProps.match.params.id],
    };
};

export default connect(mapStateToProps, { fetchBlog, editBlog })(BlogEdit);
