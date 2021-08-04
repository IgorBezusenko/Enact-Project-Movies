import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {clearVideoUrl} from "../../../redux/actions";
import {Link, useHistory} from "react-router-dom";
import {NavOnBack} from "../../NavOnBack/NavOnBack";

import css from "./MovieSeries.module.less"
import Spottable from "@enact/spotlight/Spottable";

const Component = ({children, ...rest}) => {
    return (
        <button {...rest}>{children}</button>
    )
};
const ButtonSpotTable = Spottable(Component)

export const MovieSeries = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const movieFile = useSelector(state => state.mainReducer.movieFile)
    const [state, setState] = useState('')

    const onClickToSeason = (mediaTitle) => {
        setState(mediaTitle)
        dispatch(clearVideoUrl())
    }
    const onSelectSeason = (e, mediaTitle) => {
        if (e.code === "Enter") {
            onClickToSeason(mediaTitle)
        }
    }
    const onSelectSeries = (e, path) => {
        if (e.code === "Enter") {
            history.push(path)
        }
    }

    const seasonSel = movieFile.media && movieFile.media.filter(sel => sel.title === state)
    const onBackHandler = () => props.history.goBack()

    return (
        <div  style={{
            width: "100%",
            height:"100%",
            backgroundImage: `url(${movieFile.logo})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 0",
            backgroundSize: "cover",

        }}>
            <div
                className={css.container}>
                <NavOnBack className={css.on__back} onGoBack={onBackHandler} title={movieFile.title}/>
                <div className={css.season__row}>
                    {

                        movieFile.media && movieFile.media.map((media, index) => {
                            return (
                                <>
                                    {media.title
                                    && <ButtonSpotTable key={index}
                                                        className={css.btn + " " + css.btn__season}
                                                        onClick={() => onClickToSeason(media.title)}
                                                        onKeyDown={(e) => onSelectSeason(e, media.title)}
                                    >{media.title}</ButtonSpotTable>}
                                </>
                            )
                        })
                    }
                </div>

                {
                    state && <div className={css.series__container}>
                        <div className={css.series__row}>
                            {
                                seasonSel.map(sel => {
                                    return (
                                        <>
                                            {
                                                sel.items.map((item, index) => {
                                                    return (
                                                        <>
                                                            <Link to={"/player?file=" + item.file} key={index}>
                                                                <ButtonSpotTable
                                                                    className={css.btn + " " + css.btn__series}
                                                                    onKeyDown={(e) => onSelectSeries(e, "/player?file=" + item.file)}
                                                                >{item.title}</ButtonSpotTable>
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
                    </div>
                }
            </div>
        </div>
    )

}


