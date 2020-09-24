import React, {useState} from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import { deleteBlog } from "../../actions";
import history from "../../history";
import "../../styles/Blogs/Blog.css";

const BlogDelete = (props) => {

    const { id, title } = props;
    const [show, setShow] = useState(false);

    function actions() {

        return (
            <>
                <button
                    onClick={() => props.deleteBlog(id)}
                    className="btn"
                >
                    Delete
                </button>
                <button
                    onClick={() => setShow(false)}
                    className="btn"
                >
                    Cancel
                </button>
            </>
        );
    }

    function renderContent() {
        return <span>Are you sure you want to delete the blog <strong>{title}</strong> ?</span>;
    }

    return (
        <div>
            <span onClick={() => setShow(true)} >Delete</span>
            {show &&
                <Modal
                    header="Delete Blog"
                    content={renderContent()}
                    actions={actions()}
                    onDismiss={() => setShow(false)}
                />
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.user.auth,
    };
};

export default connect(null, { deleteBlog })(BlogDelete);
