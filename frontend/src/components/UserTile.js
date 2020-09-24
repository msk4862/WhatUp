import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "../styles/Blogs/userTile.css";

const UserTile = ({ userImage, userHandle, createdAt }) => {
    dayjs.extend(relativeTime);

    return (
        <div className="user-tile">
            <img src={userImage} alt={`${userHandle}`} />
            <span>
                <a href="#">{userHandle}</a>
                {dayjs(createdAt).fromNow()}
            </span>
        </div>
    );
};

export default UserTile;
