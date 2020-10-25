import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUser, authenticate } from "../redux/actions";
import history from "../history";
import Post from "../components/Posts/Post";
import StaticProfile from "../components/Profile/StaticProfile";
import CardSkeleton from "../components/Skeletons/CardSkeleton";
import ProfileSkeleton from "../components/Skeletons/ProfileSkeleton";

const User = (props) => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);

    // page title
    useEffect(() => {
        document.title = `${props.match.params.handle}`;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // fetch user details
    useEffect(() => {
        props.fetchUser(props.match.params.handle);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // checking if already logged in
    useEffect(() => {
        if (!props.authenticated) {
            let token = localStorage.getItem("jwtToken");
            if (token) props.authenticate(token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { loading, tempUser, errorCode } = props.user;

    useEffect(() => {
        // user not found
        if (errorCode === 404) {
            history.push("/404");
        } else if (tempUser && tempUser.posts && tempUser.user) {
            setPosts(tempUser.posts);
            setUser(tempUser.user);
        }
    }, [tempUser, errorCode]);

    const renderPosts = () => {
        if (loading) return <CardSkeleton />;
        if (posts !== []) {
            return posts.map((post) => {
                return <Post key={post.postId} post={post} />;
            });
        } else {
            return <h2>No posts yet written!</h2>;
        }
    };

    return (
        <div className="row justify-content-center mt-4">
            <section className="col-12 col-sm-3 order-sm-2">
                {!user && (
                    <div className="profile">
                        <ProfileSkeleton />
                    </div>
                )}
                {user && <StaticProfile profile={user} />}
            </section>
            <section className="col-12 col-sm-9 blogs-list">
                {renderPosts()}
            </section>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps, { fetchUser, authenticate })(User);
