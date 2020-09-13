import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchUser } from "../actions";

const UserHeader = (props) => {
    useEffect(() => {
        props.fetchUser(props.author_id);
        // eslint-disable-next-line
    }, []);

    function renderUserHeader() {
        if (props.user) {
            return (
                <strong>{`${props.user.first_name} ${props.user.last_name}`}</strong>
            );
        } else {
            return <p>Loading..</p>;
        }
    }

    return (
        <span href="#" className="card-link">
            {renderUserHeader()}
        </span>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user.users.find((user) => ownProps.author_id === user.id),
    };
};

export default connect(mapStateToProps, { fetchUser })(UserHeader);
