import React, { useState } from "react";
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions";
import MarkdownEditor from "../../components/MarkdownEditor";
import "../../styles/Posts/commentForm.css";
import { isBlank, isEmptyObj } from "../../utilities/dataValidation";

const CommentForm = (props) => {
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState({});

    const postComment = (event) => {
        event.preventDefault();
        const data = {
            body: comment,
        };

        let err = {};
        if (isBlank(data.body)) err.comment = "Can't be empty!";

        if (isEmptyObj(err)) {
            props.submitComment(props.post.postId, data);
            setComment("");
        }

        setErrors(err);
    };

    const { authenticated } = props;

    return (
        <div className="comment-form">
            {authenticated && (
                <form
                    className="form row justify-content-center"
                    onSubmit={postComment}
                >
                    <div className="col-12">
                        <div className="form-group mb-2">
                            <MarkdownEditor
                                editorPlaceholder="What your thoughts? (markdown supported)"
                                editorRows="3"
                                editorValue={comment}
                                editorSetValue={setComment}
                                previewBg={true}
                            />

                            {errors.comment ? (
                                <small className="error-message">
                                    {errors.comment}
                                </small>
                            ) : null}
                        </div>
                        <div className="form-group row justify-content-end m-0">
                            <button type="submit" className="btn">
                                Post
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        post: state.data.post,
        authenticated: state.user.authenticated,
        ui: state.ui,
    };
};
export default connect(mapStateToProps, { submitComment })(CommentForm);
