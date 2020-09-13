import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "../../styles/Blogs/BlogCreate.css";
import { createBlog } from "../../actions";
import history from "../../history";

const BlogCreate = (props) => {
    const [title, setTitle] = useState("");
    const [shortDesc, setShortDesc] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        if (!props.auth.isLoggedIn) {
            history.push("/login");
        }
    }, []);

    useEffect(() => {
        if (props.alert.isError) {
            console.log(props.alert.message);
        }
    });

    function onCreateBlog(event) {
        event.preventDefault();

        const user_id = props.auth.currentUserId;

        const blog = {
            Title: title,
            BodyMeta: shortDesc,
            Body: body,
            Author: user_id,
        };
        props.createBlog(blog);
    }

    return (
        <form className="blog-create-form" onSubmit={onCreateBlog}>
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
                        Publish Blog
                    </button>
                </div>
            </div>
        </form>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.user.auth,
        alert: state.alert,
    };
};
export default connect(mapStateToProps, { createBlog })(BlogCreate);
