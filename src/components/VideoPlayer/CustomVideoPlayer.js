import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "../../utils/useQuery";
import {getVideoUrl} from "../../redux/actions";
import CVPlayer from "./CVPlayer";

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
            {
                videoUrl &&
                <CVPlayer url={videoUrl}/>
            }
        </>
    )
}
