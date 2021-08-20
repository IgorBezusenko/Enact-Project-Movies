import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "../../utils/useQuery";
import {getVideoUrl} from "../../redux/actions";
import ReactPlayer from "react-player";
import {NavOnBack} from "../NavOnBack/NavOnBack";

import css from "./VideoPlayer.module.less"

export const CustomVideoPlayer = (props) => {
    const videoUrl = useSelector(state => state.mainReducer.videoUrl)
    const dispatch = useDispatch()
    const query = useQuery()
    const file = query.get("file")

    useEffect(() => {
        dispatch(getVideoUrl(file))
    }, [])
    return (
        <>
                <NavOnBack title={"Tittle"} className={css.on__back} onGoBack={()=>props.history.goBack()}/>
                <ReactPlayer
                    controls
                    playing
                    width={"100%"}
                    height={"100%"}
                    url={videoUrl}

                />

            {/*{*/}
            {/*    videoUrl &&*/}
            {/*    <ReactHlsPlayer*/}
            {/*        src={videoUrl}*/}
            {/*        autoPlay*/}
            {/*        width="auto"*/}
            {/*        controls*/}

            {/*    />*/}
            {/*}*/}
        </>
    )
}
