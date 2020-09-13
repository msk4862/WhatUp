import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchBlog } from "../../actions";
import UserHeader from "../UserHeader";
import "../../styles/Blogs/BlogShow.css";

const BlogShow = (props) => {
  // replacement of componentDidMount()
  // empty array is passed as second argument to use it like componentDidMount()
  useEffect(() => {
    const { id } = props.match.params;
    props.fetchBlog(id);
    // eslint-disable-next-line
  }, []);

  function renderBlog() {
    if (props.blog) {
      if (props.blog.Author) {
        return (
          <div className="container-fluid blog-body">
            <h1 className="blog-title">{props.blog.Title}</h1>
            <div className="blog-meta">
              <UserHeader author_id={props.blog.Author} />
              <span> | {props.blog.DateCreated}</span>
            </div>
            <div className="blog-body">
              <p>{props.blog.Body}</p>
            </div>
          </div>
        );
      }
    } else {
      return <div>Loading...</div>;
    }
  }

  return <div>{renderBlog()}</div>;
};

const mapStateToProps = (state, ownProps) => {
  return { blog: state.blogs[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchBlog })(BlogShow);
