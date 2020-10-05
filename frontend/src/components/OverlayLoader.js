import React, { useEffect, useState } from "react";
import Loader from "./Loader";

export let toggleOverlay;

export default function OverlayLoader() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        toggleOverlay = () => setIsLoading((isLoading) => !isLoading);
    }, [isLoading]);

    return isLoading ? <Loader isOverlay /> : null;
}
