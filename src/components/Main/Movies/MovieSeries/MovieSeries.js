import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {clearVideoUrl} from "../../../../redux/actions";
import {useHistory} from "react-router-dom";
import {NavOnBack} from "../../../NavOnBack/NavOnBack";

import css from "./MovieSeries.module.less"
import {ItemBase} from "../../../Buttons/ItemBase";
import {SeasonList} from "./SeasonList";
import {SeriesList} from "./SeriesList";

// const Component = ({children, ...rest}) => {
//     return (
//         <button {...rest}>{children}</button>
//     )
// };
// const ButtonSpotTable = Spottable(Component)

export const MovieSeries = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const movieFile = useSelector(state => state.mainReducer.movieFile)
    const [currentSeason, setCurrentSeason] = useState('Сезон 1')
    const [currentSeries, setCurrentSeries] = useState(null)
    const [loading, setLoading] = useState(false)

    const onClickToSeason = (mediaTitle) => {
        setLoading(true)
        setTimeout(() => {
            setCurrentSeason(mediaTitle)
            setLoading(false)
        }, 100)
        dispatch(clearVideoUrl())
    }

    const onSelectSeries = (e, path) => {
        if (e.code === "Enter") {
            setCurrentSeries(path)
            history.push(path)
        }
    }

    const seasonSel = movieFile.media && movieFile.media.filter(sel => sel.title === currentSeason)

    const onGoPath = (path) => history.push(path)
    const onSelect = (e, path) => {
        if (e.code === "ArrowUp") {
            onGoPath(path)
        }
    }
    console.log("currentSeason", currentSeason)
    console.log("currentSeries", currentSeries)
    return (
        <div style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${movieFile.logo})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 0",
            backgroundSize: "cover",

        }}>
            <div
                className={css.container}>
                <NavOnBack className={css.on__back}
                           title={movieFile.title}
                           onClick={() => onGoPath(`/detail?id=${movieFile.id}`)}
                           onKeyDown={(e => onSelect(e, `/detail?id=${movieFile.id}`))}
                />
                <div className={css.season__row}>
                    <SeasonList mediaItems={movieFile.media && movieFile.media}
                                onClickToSeason={onClickToSeason}
                                currentSeason={currentSeason}
                    />

                </div>

                {
                    !loading && <>
                        {
                            currentSeason && <div className={css.series__container}>
                                <div className={css.series__row}>
                                    <ItemBase className={css.on__back}>{""}</ItemBase>

                                    <SeriesList seasonSel={seasonSel} onSelectSeries={onSelectSeries}/>

                                    <ItemBase className={css.on__back}>{""}</ItemBase>
                                </div>
                            </div>}
                    </>

                }
            </div>
        </div>
    )
}




