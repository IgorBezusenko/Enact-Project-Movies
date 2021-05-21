import ReactHlsPlayer from "react-hls-player";
import React from "react";

export const VideoPlayer=({videoUrl})=>{
    return(
        <>
            <ReactHlsPlayer
                src={videoUrl}
                autoPlay
                controls
                width="900"
                height="auto"/>
        </>
    )
}