import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "../../utils/useQuery";
import {getVideoUrl} from "../../redux/actions";
import CVPlayer1 from "./CVPlayer1";

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
            {/*<NavOnBack title={"Tittle"} className={css.on__back} onGoBack={() => props.history.goBack()}/>*/}

            {videoUrl && <CVPlayer1 url={videoUrl}/>}

            {/*<CVPlayer1 url={"https://portal.idc.md/img/10004/10004.m3u8"}/>*/}


        </>
    )
}
