import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {clearVideoUrl} from "../../../redux/actions";
import {Link} from "react-router-dom";

export const MovieSeries = ({movieFile}) => {
    const dispatch = useDispatch()
    const [state, setState] = useState('')
    const onClickToSeason = (mediaTitle) => {
        setState(mediaTitle)
        dispatch(clearVideoUrl())
    }
    const seasonSel = movieFile.media.filter(sel => sel.title === state)
    return (
        <>
            {
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
                                                <Link to={"/series?file=" + item.file}>
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