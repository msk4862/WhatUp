import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "../../styles/Blogs/comments.css";

const Comments = ({ comments }) => {
    dayjs.extend(relativeTime);

    console.log(comments)
    return (
        <div className="comments">
            {comments && comments.length > 0 ?
            comments.map(comment => {
                const { userImage, userHandle, body, createdAt } = comment;

                return (
                <div className="row align-items-center">
                    <div className="col-12 col-sm-10">
                        <div className="media">
                            <div className="media-left mr-2">
                                <img className="media-object" src={userImage} alt={`${userHandle}`} />
                            </div>
                            <div className="media-body">
                                <Link to="#">
                                    <h5 className="media-heading mb-0">{userHandle}</h5>
                                </Link> 
                                <small>{dayjs(createdAt).fromNow()}</small>

                                <p>{body}</p>
                            </div>
                        </div>
                    </div>
                </div>  
                )
            }) : null
            }
        </div>
    )
}

export default Comments;