import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "../styles/profile.css";

const StaticProfile = ({ profile }) => {
    dayjs.extend(relativeTime);

    const { imageUrl, handle, bio, website, createdAt, location } = profile;

    return (
        <div className="profile">
            <div className="row profile-panel justify-content-center">
                <div className="col-12 ml-auto mr-auto">
                    <div className="text-center">
                        <img
                            className="rounded-circle"
                            src={imageUrl}
                            alt={`${handle}`}
                        />
                    </div>

                    <div className="row justify-centent-center mt-2">
                        <div className="col-12 mb-2">
                            <a href={`#`}>
                                <h4>@{handle}</h4>
                            </a>
                        </div>
                        {bio && (
                            <div className="col-12">
                                <p>{bio}</p>
                            </div>
                        )}

                        {location && (
                            <div className="col-12">
                                <p>
                                    <i className="fas fa-map-marker-alt"></i>{" "}
                                    {location}
                                </p>
                            </div>
                        )}
                        {website && (
                            <div className="col-12">
                                <p>
                                    <i className="fas fa-link"></i>{" "}
                                    <a
                                        href={website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {website}
                                    </a>
                                </p>
                            </div>
                        )}
                        <div className="col-12">
                            <p>
                                <i className="fas fa-calendar-alt"></i> Joined{" "}
                                {dayjs(createdAt).fromNow()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaticProfile;
