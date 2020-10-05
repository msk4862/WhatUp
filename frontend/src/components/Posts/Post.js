import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import FirebaseAPI from "../../apis/FirebaseAPI";
import { setPost } from "../../redux/actions";
import "../../styles/Posts/Post.css";
import { toggleOverlay } from "../OverlayLoader";
import LikeButton from "./LikeButton";
import PostDelete from "./PostDelete";
import UserTile from "./UserTile";

const Post = ({ post, user, setPost }) => {
    dayjs.extend(relativeTime);
    const history = useHistory();
    const {
        postId,
        title,
        bodyMeta,
        createdAt,
        userImage,
        userHandle,
        likeCount,
        commentCount,
    } = post;

    const {
        authenticated,
        credentials: { handle },
    } = user;

    const fetchData = async () => {
        toggleOverlay();
        FirebaseAPI.get(`/posts/${postId}`)
            .then((res) => {
                setPost(res.data);
                toggleOverlay();
                history.push(`/posts/${postId}`);
            })
            .catch((err) => console.error(err));
    };

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
                            to={`/posts/edit/${postId}`}
                        >
                            Edit
                        </Link>
                        <div className="dropdown-item">
                            <PostDelete id={postId} title={bodyMeta} />
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
                <h5
                    className="card-title"
                    onClick={fetchData}
                    style={{ cursor: "pointer" }}
                >
                    {title}
                </h5>
                <p className="card-text">{bodyMeta}</p>
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
export default connect(mapStateToProps, { setPost })(Post);
