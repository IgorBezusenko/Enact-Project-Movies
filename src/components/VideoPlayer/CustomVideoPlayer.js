import React from "react";
import {useSelector} from "react-redux";
import CVPlayer1 from "./CVPlayer1";

export const CustomVideoPlayer = () => {
    const videoUrl = useSelector(state => state.mainReducer.videoUrl)

    return (
        <>
            {videoUrl && <CVPlayer1 url={videoUrl}/>}
        </>
    )
}
