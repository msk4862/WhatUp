import React from "react";
import Skeleton from "react-loading-skeleton";

const ProfileSkeleton = () => (
    <div className="row profile-panel justify-content-center">
        <div className="col-12 ml-auto mr-auto">
            <Skeleton circle={true} width={200} height={200} />

            <div className="row justify-centent-center mt-2">
                <div className="col-12 mb-2">
                    <Skeleton height={30} width={`40%`} />
                </div>
                <div className="col-12">
                    <Skeleton width={`50%`} />
                </div>
                <div className="col-12">
                    <Skeleton width={`40%`} />
                </div>
                <div className="col-12">
                    <Skeleton width={`30%`} />
                </div>
                <div className="col-12">
                    <Skeleton width={`40%`} />
                </div>
            </div>
        </div>
    </div>
);

export default ProfileSkeleton;
