import React from "react";
import "../../styles/Posts/comments.css";
import UserTile from "./UserTile";

const Comments = ({ comments }) => {
    return (
        <div className="comments">
            {comments && comments.length > 0
                ? comments.map((comment, index) => {
                      const {
                          userImage,
                          userHandle,
                          body,
                          createdAt,
                      } = comment;

                      return (
                          <div key={index}>
                              <UserTile
                                  userHandle={userHandle}
                                  userImage={userImage}
                                  body={body}
                                  createdAt={createdAt}
                              />
                          </div>
                      );
                  })
                : null}
        </div>
    );
};

export default Comments;
