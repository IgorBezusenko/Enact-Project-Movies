import {Link, useHistory} from "react-router-dom";
import {MovieFilm} from "../Main/Movies/MovieFilm";
import React from "react";
import {ButtonMovie} from "./ButtonMovie";
import {Play} from "react-feather";
import css from "./ButtonMovie.module.less"

export const ButtonPlay = ({movieFile}) => {
    const isSerial = movieFile.media && movieFile.media.map(media => media.title[0])
    const history = useHistory()

    const onSelect = (e) => {
        if (e.code === "Enter") {
            history.push("/series")
        }
    }

    return (
        <>
            {movieFile.media && isSerial.length > 0 && isSerial[0] !== undefined
                ? <Link to={"/series"}>
                    <ButtonMovie onKeyDown={(e) => onSelect(e)} className={css.btn__movie} title={"Смотреть"}>
                        <Play/>
                    </ButtonMovie>
                </Link>
                : <MovieFilm movieFile={movieFile}/>}
        </>
    )
}
