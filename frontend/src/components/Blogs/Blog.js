import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LikeButton from "./LikeButton";
import "../../styles/Blogs/Blog.css";
import BlogDelete from "./BlogDelete";
import UserTile from "../UserTile";

const Blog = (props) => {
    dayjs.extend(relativeTime);

    const {
        postId,
        bodyMeta,
        body,
        createdAt,
        userImage,
        userHandle,
        likeCount,
        commentCount,
    } = props.blog;

    const {
        authenticated,
        credentials: { handle },
    } = props.user;

    function renderAdmin() {
        return (
            <div className="menu">
                <div className="dropleft">
                    <div className="dropdown-toggle" data-toggle="dropdown">
                        <i className="fas fa-ellipsis-v"></i>
                    </div>

                    <div className="dropdown-menu">
                        <Link
                            className="dropdown-item"
                            to={`/blogs/edit/${postId}`}
                        >
                            Edit
                        </Link>
                        <div className="dropdown-item">
                            <BlogDelete id={postId} title={bodyMeta} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            {authenticated && userHandle === handle && renderAdmin()}
            <div className="card-body mr-1">
                <h5 className="card-title">
                    <Link to={`/blogs/${postId}`}>{bodyMeta}</Link>
                </h5>
                <p className="card-text">{body}</p>
                <div className="row meta-data align-items-center">
                    <div className="col-12 col-sm-6">
                        <UserTile
                            userImage={userImage}
                            userHandle={userHandle}
                            createdAt={createdAt}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <span>
                            <LikeButton postId={postId} /> {likeCount} Likes
                        </span>
                        <span className="ml-4">
                            <i className="far fa-comment"></i> {commentCount}{" "}
                            Comments
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return { user: state.user };
};
export default connect(mapStateToProps, {})(Blog);
