import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { fetchBlog, authenticate } from "../actions";
import UserTile from "../components/Blogs/UserTile";
import LikeButton from "../components/Blogs/LikeButton";
import Comments from "../components/Blogs/Comments";
import CommentForm from "../components/Blogs/CommentForm";
import Loader from "../components/Loader";
import "../styles/Blogs/BlogShow.css";

const BlogShow = (props) => {
    dayjs.extend(relativeTime);

    const [showComments, setShowComments] = useState(false);

    const { authenticated } = props.user;

    useEffect(() => {
        if (!authenticated) {
            let token = localStorage.getItem("jwtToken");
            if (token) props.authenticate(token);
        }
    }, [authenticated]);

    useEffect(() => {
        props.fetchBlog(props.match.params.id);
    }, []);

    const {
        loading,
        blog: {
            postId,
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
                <div className="blog-show">
                    <div className="row justify-content-center">
                        <div className="col-12 blog-body">
                            <h1 className="blog-title">{bodyMeta}</h1>
                            <div className="blog-meta">
                                <UserTile
                                    userImage={userImage}
                                    userHandle={userHandle}
                                    createdAt={createdAt}
                                />
                            </div>
                            <div className="blog-text mt-4">
                                <p>{body}</p>
                            </div>
                        </div>
                    </div>
                    <div className="blog-footer">
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

export default connect(mapStateToProps, { fetchBlog, authenticate })(BlogShow);
