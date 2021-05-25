import ReactHlsPlayer from "react-hls-player";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "../../utils/useQuery";
import {getVideoUrl} from "../../redux/actions";

export const VideoPlayer=(props)=>{
    const videoUrl = useSelector(state=>state.mainReducer.videoUrl)
    const dispatch = useDispatch()
    const query= useQuery()
    const file =query.get("file")

    useEffect(()=>{
        dispatch(getVideoUrl(file))
    },[])

    return(
        <>
            {
                videoUrl &&
                <ReactHlsPlayer
                    src={videoUrl}
                    autoPlay
                    width="auto"
                    controls

                     />
            }
        </>
    )
}