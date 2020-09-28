import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "../../styles/Posts/userTile.css";

const UserTile = ({ userImage, userHandle, createdAt, body }) => {
    dayjs.extend(relativeTime);

    return (
        <div className="row user-tile align-items-center">
            <div className="col-12 col-sm-10">
                <div className="media">
                    <div className="media-left mr-2">
                        <img
                            className="media-object"
                            src={userImage}
                            alt={`${userHandle}`}
                        />
                    </div>
                    <div className="media-body">
                        <p className="media-heading mb-0">
                            <Link to={`/user/${userHandle}`}>{userHandle}</Link>
                        </p>
                        <small>{dayjs(createdAt).fromNow()}</small>
                        <p>{body}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserTile;
