import {Link, useHistory} from "react-router-dom";
import {MovieFilm} from "../Main/Movies/MovieFilm";
import React from "react";
import {ButtonMovie} from "./ButtonMovie";
import {Play} from "react-feather";
import css from "./ButtonMovie.module.less"

export const ButtonPlay = ({movieFile}) => {
    const isSerial = movieFile.media && movieFile.media.map(media => media.title[0])
    const history = useHistory()

    const onSelect = (e,path) => {
        if (e.code === "Enter") {
            history.push(path)
        }
    }

    return (
        <>
            {
                // movieFile.media && isSerial.length > 0 && isSerial[0] !== undefined
                movieFile.serial
                ? <Link to={"/series"}>
                    <ButtonMovie onKeyPress={(e) => onSelect(e,"/series")} className={css.btn__movie} title={"Смотреть"}>
                        <Play/>
                    </ButtonMovie>
                </Link>
                : <MovieFilm movieFile={movieFile}/>}
        </>
    )
}
