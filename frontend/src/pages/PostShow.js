import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { fetchPost, authenticate } from "../redux/actions";
import history from "../history";
import UserTile from "../components/Posts/UserTile";
import LikeButton from "../components/Posts/LikeButton";
import Comments from "../components/Posts/Comments";
import CommentForm from "../components/Posts/CommentForm";
import Loader from "../components/Loader";
import MarkdownRenderer from "../components/MarkdownRenderer";
import "../styles/Posts/PostShow.css";

const BlogShow = (props) => {
    dayjs.extend(relativeTime);

    const [showComments, setShowComments] = useState(false);

    const { authenticated, errorCode } = props.user;

    useEffect(() => {
        if (!authenticated) {
            let token = localStorage.getItem("jwtToken");
            if (token) props.authenticate(token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        props.fetchPost(props.match.params.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // post not found
        if (errorCode === 404) {
            history.push("/404");
        }
    }, [errorCode]);

    const {
        loading,
        post: {
            postId,
            title,
            bodyMeta,
            body,
            createdAt,
            userImage,
            userHandle,
            likeCount,
            commentCount,
            comments,
        },
    } = props.data;

    return (
        <div>
            {loading && <Loader />}
            {!loading && (
                <div className="post-show">
                    <div className="row justify-content-center">
                        <div className="col-12 post-body">
                            <h1 className="post-title">{title}</h1>
                            <h5 className="mt-3">{bodyMeta}</h5>
                            <div className="post-meta">
                                <UserTile
                                    userImage={userImage}
                                    userHandle={userHandle}
                                    createdAt={createdAt}
                                />
                            </div>
                            <div className="post-text mt-4">
                                <MarkdownRenderer content={body} />
                            </div>
                        </div>
                    </div>
                    <div className="post-footer">
                        <div className="row">
                            <div className="col">
                                <span>
                                    <LikeButton postId={postId} /> {likeCount}{" "}
                                    Likes
                                </span>
                                <span
                                    className="ml-4"
                                    onClick={() =>
                                        setShowComments(
                                            (prevState) => !prevState
                                        )
                                    }
                                >
                                    <i className="far fa-comment"></i>{" "}
                                    {commentCount} Comments
                                </span>
                            </div>
                        </div>

                        {showComments && (
                            <>
                                <hr />
                                <CommentForm />
                                <Comments comments={comments} />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        data: state.data,
        user: state.user,
    };
};

export default connect(mapStateToProps, { fetchPost, authenticate })(BlogShow);
