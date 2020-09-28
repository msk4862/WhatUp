import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUser, authenticate } from "../actions/index";
import Post from "../components/Posts/Post";
import StaticProfile from "../components/Profile/StaticProfile";
import CardSkeleton from "../components/Skeletons/CardSkeleton";
import ProfileSkeleton from "../components/Skeletons/ProfileSkeleton";

const User = (props) => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        props.fetchUser(props.match.params.handle);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!props.authenticated) {
            let token = localStorage.getItem("jwtToken");
            if (token) props.authenticate(token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { loading, tempUser } = props.user;

    useEffect(() => {
        if (tempUser && tempUser.posts && tempUser.user) {
            setPosts(tempUser.posts);
            setUser(tempUser.user);
        }
    }, [tempUser]);

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
