import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "../styles/Blogs/userTile.css";

const UserTile = ({ userImage, userHandle, createdAt }) => {
    dayjs.extend(relativeTime);

    return (
        <div className="user-tile">
            <img src={userImage} alt={`${userHandle}`} />
            <span>
                <Link to={`/user/${userHandle}`}>{userHandle}</Link>
                {dayjs(createdAt).fromNow()}
            </span>
        </div>
    );
};

export default UserTile;
