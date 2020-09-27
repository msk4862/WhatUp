import React from "react";
import Skeleton from "react-loading-skeleton";

const CardSkeleton = () => (
    <div>
        {Array(3)
            .fill()
            .map((item, index) => (
                <div key={index} className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Skeleton height={40} />
                        </h5>
                        <p className="card-text">
                            <Skeleton count={2} />
                        </p>
                        <div className="row meta-data align-items-center">
                            <div className="col-12 col-sm-6">
                                <Skeleton
                                    circle={true}
                                    height={30}
                                    width={30}
                                />
                            </div>
                            <div className="col-12 col-sm-6">
                                <Skeleton width={`40%`} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
    </div>
);

export default CardSkeleton;
