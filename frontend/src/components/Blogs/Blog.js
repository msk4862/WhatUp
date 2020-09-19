import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "../../styles/Blogs/Blog.css";

const Blog = ({ id, title, desc, date, userImage, author, auth }) => {

    dayjs.extend(relativeTime);

    function renderAdmin() {
        const current_user = auth.currentUserId;

        if (current_user === author) {
            return (
                <div className="row justify-content-end">
                    <Link
                        style={{ backgroundColor: "#46a049" }}
                        type="button"
                        className="btn mr-4"
                        to={`/blogs/edit/${id}`}
                    >
                        Edit
                    </Link>
                    <Link
                        style={{ backgroundColor: "#d63447" }}
                        type="button"
                        className="btn mr-4"
                        to={`/blogs/delete/${id}`}
                    >
                        Delete
                    </Link>
                </div>
            );
        } else {
            return null;
        }
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">
                    <Link to={`/blogs/${id}`}>{title}</Link>
                </h5>
                <p className="card-text">{desc}</p>
                <div className="row meta-data justify-content-between align-items-center">
                    <div className="col">
                        <div>
                            <img src={userImage}/>
                            <span><a href="#">{author}</a><small>{dayjs(date).fromNow()}</small></span>
                        </div>
                    </div>
                </div>
                {/* {auth.isLoggedIn ? renderAdmin() : null} */}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return { auth: state.user.auth };
};
export default connect(mapStateToProps, {})(Blog);
