import React, { useState } from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import { deletePost } from "../../redux/actions";
import "../../styles/Posts/Post.css";

const PostDelete = (props) => {
    const { id, title } = props;
    const [show, setShow] = useState(false);

    function actions() {
        return (
            <>
                <button onClick={() => props.deletePost(id)} className="btn">
                    Delete
                </button>
                <button onClick={() => setShow(false)} className="btn">
                    Cancel
                </button>
            </>
        );
    }

    function renderContent() {
        return (
            <span>
                Are you sure you want to delete the post{" "}
                <strong>{title}</strong> ?
            </span>
        );
    }

    return (
        <div>
            <div onClick={() => setShow(true)}>Delete</div>
            {show && (
                <Modal
                    header="Delete Blog"
                    content={renderContent()}
                    actions={actions()}
                    onDismiss={() => setShow(false)}
                />
            )}
        </div>
    );
};

export default connect(null, { deletePost })(PostDelete);
