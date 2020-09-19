import React, { useEffect } from "react";
import { connect } from "react-redux";
import { authenticate, uploadImage } from "../actions/index";
import EditProfile from "./EditProfile"; 
import "../styles/profile.css";

const Profile = (props) => {

    useEffect(() => {
        if(!props.user.authenticated) {
            // fetch user details 
            let token = localStorage.getItem("jwtToken");
            if(token) props.authenticate(token);
        }
    }, [props.user.authenticated]);

    // upload new image
    const handleImageChange = (event) => {
        const image = event.target.files[0];
        if(!image) return;
        const formData = new FormData();
        formData.append("image", image, image.name);
        props.uploadImage(formData);
    }

    const editImage = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    }

    const { imageUrl, handle, bio, website, createdAt, location } = props.user.credentials;

    return (
        <div className="profile container">
            {props.loading && <p>Loading...</p>}
            {!props.loading &&
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-6 ml-auto mr-auto">
                        <div className="text-center">
                            <img className="rounded-circle" src={imageUrl} alt="profile"/>
                            <input 
                                type="file"
                                id="imageInput"
                                name="image"
                                hidden="hidden"
                                onChange={handleImageChange}/>

                            <div className="edit-ic">
                                <button onClick={editImage}>
                                    <span className="custom-tooltip" data-text="Change your profile picture">
                                        <i className="fas fa-pencil-alt"></i>
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className="details mt-3">
                            <div className="mb-4">
                                <h4>Profile</h4>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col">
                                    <p>Username</p>
                                </div>
                                <div className="col">
                                    <p>@{handle}</p>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                            <div className="col">
                                    <p>Bio</p>
                                </div>
                                <div className="col">
                                    <p>{bio}</p>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col">
                                    <p>Website</p>
                                </div>
                                <div className="col">
                                    <a href={website} target="_blank" >{website}</a>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col">
                                    <p>Location</p>
                                </div>
                                <div className="col">
                                    <p>{location}</p>
                                </div>
                            </div>
                            
                            <div className="row justify-content-end">
                                <EditProfile 
                                    initialBio={bio}
                                    initialWebsite={website}
                                    initialLocation={location}/>
                            </div>
                        
                        </div>

                    </div>
                </div>
            }
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        loading: state.ui.loading,
    }
}

export default connect(mapStateToProps, { authenticate, uploadImage })(Profile);
