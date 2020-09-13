import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchBlogs, login } from "../../actions";
import Blog from "./Blog";

import "../../styles/Blogs/BlogList.css";

const BlogList = (props) => {
  useEffect(() => {
    props.fetchBlogs();

    if (!props.auth.isLoggedIn & localStorage.getItem("jwtToken")) {
      // trying login using browser cache
      props.login();
    }
  }, []);

  function renderBlogs() {
    if (props.blogs) {
      if (
        (props.location.pathname === "/blogs/my-blogs") &
        props.auth.isLoggedIn
      ) {
        // render current user's blog only
        const user_id = props.auth.currentUserId;

        return props.blogs.map((blog) => {
          if (blog.Author === user_id) {
            return (
              <Blog
                key={blog.id}
                id={blog.id}
                title={blog.Title}
                desc={blog.BodyMeta}
                date={blog.DateCreated}
                author={blog.Author}
              />
            );
          }
        });
      } else {
        return props.blogs.map((blog) => {
          return (
            <Blog
              key={blog.id}
              id={blog.id}
              title={blog.Title}
              desc={blog.BodyMeta}
              date={blog.DateCreated}
              author={blog.Author}
            />
          );
        });
      }
    } else {
      return <h2>Sorry! No blogs yet written.</h2>;
    }
  }

  return <div className="container-fluid postlist">{renderBlogs()}</div>;
};

const mapStateToProps = (state) => {
  return {
    auth: state.user.auth,
    blogs: Object.values(state.blogs),
  };
};
export default connect(mapStateToProps, { fetchBlogs, login })(BlogList);
