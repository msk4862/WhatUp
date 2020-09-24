import React from "react";
import { connect } from "react-redux";
import { likeBlog, unlikeBlog } from "../../actions";
import "../../styles/Blogs/Blog.css";

const LikeButton = (props) => {

    const { authenticated, likes, credentials: {handle} } = props.user;
    const { postId } = props;

    const like = () => {
        props.likeBlog(postId);
    }

    const unlike = () => {
        props.unlikeBlog(postId);
    }

    const renderLike = () => {
        if(likes.filter(like => (like.userHandle === handle && like.postId === postId)).length > 0) {
            return <i className="fas fa-heart" onClick={unlike}></i>
            
        }
        else {
            return <i className="far fa-heart" onClick={like}></i>
        }
    }

    return (
        <>
            {!authenticated && 
                <i className="far fa-heart"></i>
            }
            {authenticated && renderLike()}
        </>
    );
};

const mapStateToProps = (state) => {
    return { user: state.user };
};
export default connect(mapStateToProps, { likeBlog, unlikeBlog })(LikeButton);
