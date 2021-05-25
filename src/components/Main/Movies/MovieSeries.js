import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {clearVideoUrl} from "../../../redux/actions";
import {Link} from "react-router-dom";
import {NavOnBack} from "../../NavOnBack/NavOnBack";


export const MovieSeries = (props) => {
    const dispatch = useDispatch()
    const movieFile = useSelector(state => state.mainReducer.movieFile)
    const [state, setState] = useState('')
    const onClickToSeason = (mediaTitle) => {
        setState(mediaTitle)
        dispatch(clearVideoUrl())
    }
    const seasonSel = movieFile.media && movieFile.media.filter(sel => sel.title === state)
    const onBackHandler = () => props.history.goBack()
    return (
        <><NavOnBack onGoBack={onBackHandler} title={movieFile.title}/>
            {movieFile.media &&
            movieFile.media.map(media => {
                return (
                    <>
                        <span>
                            {media.title && <button onClick={() => onClickToSeason(media.title)}>{media.title}</button>}
                        </span>

                    </>
                )
            })
            }
            <div>
                {
                    seasonSel.map(sel => {
                        return (
                            <>
                                {
                                    sel.items.map(item => {
                                        return (
                                            <>
                                                <Link to={"/player?file=" + item.file}>
                                                    <button>{item.title}</button>
                                                </Link>

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