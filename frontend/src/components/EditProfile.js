import React, { useState } from "react";
import { connect } from "react-redux";
import Modal from "./Modal";
import { editUserDetails } from "../actions/index";
import { isEmptyObj, isUrl } from "../utilities/dataValidation";
// import "../styles/EditProfile.css";

const EditProfile = (props) => {
    const { initialBio, initialLocation, initialWebsite } = props;

    const [show, setShow] = useState(false);
    const [bio, setBio] = useState(initialBio);
    const [website, setWebsite] = useState(initialWebsite);
    const [location, setLocation] = useState(initialLocation);
    const [errors, setErrors] = useState({});

    const handleSubmit = () => {
        const updatedDetails = {
            bio,
            website,
            location,
        };

        let Errs = {};
        if (website && !isUrl(website)) Errs.website = "Enter a valid url!";

        if (isEmptyObj(Errs)) {
            props.editUserDetails(updatedDetails);
        }
        setErrors(Errs);
    };

    const renderEditForm = () => {
        return (
            <form className="row justify-content-center mt-4">
                <div className="col">
                    <div className="form-group">
                        <label>Bio</label>
                        <input
                            type="text"
                            className="form-control"
                            value={bio}
                            onChange={(event) => {
                                setBio(event.target.value);
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Website</label>
                        <input
                            type="text"
                            className="form-control"
                            value={website}
                            onChange={(event) => {
                                setWebsite(event.target.value);
                            }}
                        />
                        {errors.website ? (
                            <small className="error-message">
                                {errors.website}
                            </small>
                        ) : null}
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <input
                            type="text"
                            className="form-control"
                            value={location}
                            onChange={(event) => {
                                setLocation(event.target.value);
                            }}
                        />
                    </div>
                </div>
            </form>
        );
    };

    const renderActions = () => {
        return (
            <>
                <button onClick={() => handleSubmit()} className="btn">
                    Save
                </button>
                <button onClick={() => setShow(false)} className="btn">
                    Cancel
                </button>
            </>
        );
    };

    return (
        <>
            <button
                className="custom-tooltip"
                data-text="Edit your details"
                onClick={() => setShow(true)}
            >
                <i className="fas fa-pencil-alt"></i>
            </button>
            {show && (
                <Modal
                    header="Edit your profile"
                    content={renderEditForm()}
                    actions={renderActions()}
                    onDismiss={() => setShow(false)}
                />
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return { credentials: state.user.credentials };
};

export default connect(mapStateToProps, { editUserDetails })(EditProfile);
