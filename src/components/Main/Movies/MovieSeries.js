import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {clearVideoUrl, getVideoUrl} from "../../../redux/actions";
import {VideoPlayer} from "../../VideoPlayer/VideoPlayer";


export const MovieSeries = ({movieFile}) => {
    const dispatch = useDispatch()
    const videoUrl = useSelector(state => state.mainReducer.videoUrl)
    const [state, setState] = useState('')

    // const onClearVideoUrl=()=>{
    //     dispatch(clearVideoUrl())
    // } // const onClearVideoUrl=()=>{
    //     dispatch(clearVideoUrl())
    // }

    const onClickToSeason = (mediaTitle) => {
        setState(mediaTitle)
        dispatch(clearVideoUrl())
    }

    const seasonSel = movieFile.media.filter(sel => sel.title === state)
    if (seasonSel) {
        console.log("seasonSel", seasonSel.map(i => console.log("i.items", i.items)))
        console.log("seasonSel", seasonSel)
    }

    console.log("movieFile.media", movieFile.media)
    console.log("state", state)
    return (
        <>
            {
                movieFile.media.map(media => {
                    // console.log("media", media)
                    // console.log("media.title", media.title)
                    // console.log("media.items", media.items)
                    return (
                        <>
                        <span>
                            {media.title && <button onClick={() => onClickToSeason(media.title)}>{media.title}</button>}
                        </span>


                            <span>
                                {/*{*/}
                                {/*    media.items.map(item => {*/}
                                {/*        console.log('item',item)*/}
                                {/*        const onClickVideoUrl = (file) => {*/}

                                {/*            dispatch(getVideoUrl(file))*/}
                                {/*            // const response= MainAPI.videoUrl(file)*/}
                                {/*            //  console.log(response)*/}

                                {/*        }*/}
                                {/*        if (videoUrl) {*/}
                                {/*            console.log("file", videoUrl)*/}
                                {/*        }*/}
                                {/*        return (*/}
                                {/*            <>*/}
                                {/*                 <span>*/}
                                {/*                       <button*/}
                                {/*                           onClick={() => onClickVideoUrl(item.file)}*/}
                                {/*                       >{item.title}</button>*/}
                                {/*                 </span>*/}
                                {/*                {*/}
                                {/*                    videoUrl && <VideoPlayer videoUrl={videoUrl}/>*/}

                                {/*                }*/}
                                {/*            </>*/}
                                {/*        )*/}
                                {/*    })*/}
                                {/*}*/}
                            </span>
                        </>
                    )
                })
            }
            <div>

                {
                    seasonSel.map(sel => {
                        console.log("i.items", sel.items)
                        return (
                            <>
                                {
                                    sel.items.map(item => {
                                        console.log(item)
                                        const onClickVideoUrl = (file) => {
                                            console.log(file)
                                            dispatch(getVideoUrl(file))
                                            // const response= MainAPI.videoUrl(file)
                                            //  console.log(response)

                                        }
                                        return (
                                            <>
                                                <span>
                                                       <button
                                                           onClick={() => onClickVideoUrl(item.file)}
                                                       >{item.title}</button>
                                                 </span>
                                                {
                                                    videoUrl && <VideoPlayer videoUrl={videoUrl}/>

                                                }
                                            </>
                                        )
                                    })
                                }
                            </>
                        )
                    })
                }
            </div>
        </>
    )

}