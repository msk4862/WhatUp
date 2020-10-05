import React, { useEffect, useState } from "react";
import Loader from "./Loader";

export let toggleOverlay;

export default function OverlayLoader() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        toggleOverlay = () => toggleIsLoading(setIsLoading, isLoading);
    }, [isLoading]);

    return isLoading ? <Loader isOverlay /> : null;
}

const toggleIsLoading = (setIsLoading, isLoading) => setIsLoading(!isLoading);
