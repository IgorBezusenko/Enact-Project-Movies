import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {clearVideoUrl, setCurrentSeason, setCurrentSeries, setMediaFiles} from "../../../../redux/actions";
import {useHistory} from "react-router-dom";
import {NavOnBack} from "../../../NavOnBack/NavOnBack";

import css from "./MovieSeries.module.less"
import {SeasonList} from "./SeasonList";
import {SeriesList} from "./SeriesList";
import Scroller from "@enact/sandstone/Scroller";

export const MovieSeries = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const movieFile = useSelector(state => state.mainReducer.movieFile)
    const {mediaFiles, actualCurrentSeason} = useSelector(state => state.seriesReducer)
    const [currentSeason, setCurrentSeason1] = useState('Сезон 1')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (movieFile.serial) {
            dispatch(setMediaFiles(movieFile.media))
            console.log(13232132132)
        }
    }, [])

    useEffect(() => {
        dispatch(setCurrentSeason())
        if (actualCurrentSeason) {
            setCurrentSeason1(actualCurrentSeason.title)
            dispatch(setCurrentSeries())
            console.log("asdadad")
        }
    }, [mediaFiles, actualCurrentSeason])

    const onClickToSeason = (mediaTitle) => {

        setLoading(true)
        setTimeout(() => {
            setCurrentSeason1(mediaTitle)
            setLoading(false)
        }, 100)
        dispatch(clearVideoUrl())

    }

    const onSelectSeries = (path) => {
        history.push(path)
    }

    const seasonSel = movieFile.media && movieFile.media.filter(sel => sel.title === currentSeason)

    const onGoPath = (path) => history.push(path)
    const onSelect = (e, path) => {
        if (e.code === "ArrowUp") {
            onGoPath(path)
        }
    }

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
                                <Scroller>
                                    <div className={css.series__row}>
                                        {/*<ItemBase className={css.on__back}>{""}</ItemBase>*/}

                                        <SeriesList seasonSel={seasonSel} onSelectSeries={onSelectSeries}/>

                                        {/*<ItemBase className={css.on__back}>{""}</ItemBase>*/}
                                    </div>
                                </Scroller>
                            </div>}
                    </>
                }
            </div>
        </div>
    )
}




