import {useDispatch, useSelector} from "react-redux";
import {getVideoUrl} from "../../../../redux/actions";
import React from "react";
import {VideoPlayer} from "../../../VideoPlayer/VideoPlayer";


export const MovieItem = ({movieFile}) => {
    const dispatch = useDispatch()
    const videoUrl = useSelector(state => state.mainReducer.videoUrl)
    // console.log(movieFile)
    return (
        <>
            {
                movieFile.media.map(media => {
                    console.log("media", media)
                    // console.log("media.title", media.title)
                    // console.log("media.items", media.items)
                    return (
                        <>
                        <span>
                            {media.title && <button onClick={() => console.log(media.title)}>{media.title}</button>}
                        </span>
                            <span>
                               {
                                   media.items.map(item => {
                                       // console.log(item.file)
                                       const onClickVideoUrl = (file) => {

                                           dispatch(getVideoUrl(file))
                                           // const response= MainAPI.videoUrl(file)
                                           //  console.log(response)

                                       }
                                       if (videoUrl) {
                                           console.log("file", videoUrl)
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
                           </span>
                        </>
                    )
                })
                }
                </>
                )

                }