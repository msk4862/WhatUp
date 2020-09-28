import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { markNotificationRead } from "../actions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "../styles/notifications.css";

const Notifications = ({ notifications, markNotificationRead }) => {
    dayjs.extend(relativeTime);

    const [open, setOpen] = useState(false);
    const [unreadNotifications, setUnreadNotifications] = useState([]);

    // updating unread notifications
    useEffect(() => {
        let unreadNotifications = notifications.filter(
            (noti) => noti.read === false
        );
        setUnreadNotifications(unreadNotifications);
    }, [notifications]);

    // marking read all unread notifications
    useEffect(() => {
        if (open && unreadNotifications.length > 0) {
            let ids = unreadNotifications.map((noti) => noti.notificationId);
            markNotificationRead(ids);

            setUnreadNotifications([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const renderNotifications = () => {
        if (notifications && notifications.length > 0) {
            return notifications.map((noti) => {
                const read = noti.read ? "read" : "unread";
                const verb = noti.type === "like" ? "liked" : "commented on";
                const icon =
                    noti.type === "like" ? "fas fa-heart" : "fas fa-comment";
                const iconColor = noti.type === "like" ? "red" : "white";
                const time = dayjs(noti.createdAt).fromNow();
                const user = noti.sender;

                return (
                    <div
                        key={noti.notificationId}
                        className="custom-dropdown-item"
                        read={read}
                    >
                        <Link to={`/posts/${noti.postId}`}>
                            <i
                                style={{ color: iconColor }}
                                className={icon}
                            ></i>{" "}
                            <strong>{user}</strong> {verb} your blog {time}
                        </Link>
                    </div>
                );
            });
        }
    };

    return (
        <li
            className="nav-item notifications custom-dropdown"
            open={open}
            onClick={() => setOpen((prev) => !prev)}
        >
            <span className="custom-tooltip" data-text="Your notifications">
                <button className="nav-link">
                    <i className="far fa-bell"></i>
                    {/* if unread notications are present */}
                    {unreadNotifications.length > 0 && (
                        <span className="badge badge-danger">
                            {unreadNotifications.length}
                        </span>
                    )}
                </button>
            </span>
            <div className="custom-dropdown-menu">{renderNotifications()}</div>
        </li>
    );
};

const mapStateToProps = (state) => {
    return {
        notifications: state.user.notifications,
    };
};
export default connect(mapStateToProps, { markNotificationRead })(
    Notifications
);
