import React from "react";
import { Link } from "react-router-dom";

import "../styles/Blogs/Blog.css";
import UserHeader from "../UserHeader";
import { connect } from "react-redux";

const Blog = ({ id, title, desc, date, author, auth }) => {
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
        <h4 className="card-title">
          <Link to={`/blogs/${id}`}>{title}</Link>
        </h4>
        <p className="card-text">{desc}</p>
        <div className="row meta-data justify-content-between align-items-center">
          <p className="col-6 col-sm-6">Created on {date}</p>
          <div className="col-6 col-sm-6">
            <a href="#" className="card-link">
              Posted by <UserHeader author_id={author} />
            </a>
          </div>
        </div>
        {auth.isLoggedIn ? renderAdmin() : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.user.auth };
};
export default connect(mapStateToProps, {})(Blog);
