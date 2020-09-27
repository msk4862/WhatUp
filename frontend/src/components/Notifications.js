import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { markNotificationRead } from "../actions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "../styles/notifications.css";

const Notifications = (props) => {
    dayjs.extend(relativeTime);

    const [open, setOpen] = useState(false);
    const [unreadNotifications, setUnreadNotifications] = useState([]);

    const notifications = props.notifications;

    useEffect(() => {
        let unreadNotifications = notifications.filter((noti) => !noti.read);
        setUnreadNotifications(unreadNotifications);

        let ids = unreadNotifications.map((noti) => noti.notificationId);
        // props.markNotificationsRead(ids);
    }, []);

    const renderNotifications = () => {
        if (notifications && notifications.length > 0) {
            return notifications.map((noti) => {
                const verb = noti.type === "like" ? "liked" : "commented on";
                const icon =
                    noti.type === "like" ? "fas fa-heart" : "fas fa-comment";
                const iconColor = noti.type === "like" ? "red" : "white";
                const time = dayjs(noti.createdAt).fromNow();
                const user = noti.sender;

                return (
                    <div className="custom-dropdown-item">
                        <span>
                            <i
                                style={{ color: iconColor }}
                                className={icon}
                            ></i>{" "}
                            <strong>{user}</strong> {verb} your blog {time}
                        </span>
                    </div>
                );
            });
        }
    };

    return (
        <li
            className="nav-item notifications custom-dropdown"
            open={open}
            onClick={() => setOpen((p) => !p)}
        >
            <span className="custom-tooltip" data-text="Your notifications">
                <button className="nav-link">
                    <i className="far fa-bell"></i>
                    {/* if unread notications are present */}
                    {unreadNotifications.length > 0 && (
                        <span class="badge badge-danger">
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
