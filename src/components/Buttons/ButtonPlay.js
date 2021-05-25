import {Link} from "react-router-dom";
import {MovieFilm} from "../Main/Movies/MovieFilm";
import React from "react";
import {ButtonMovie} from "./ButtonMovie";
import {Play} from "react-feather";

export const ButtonPlay = ({movieFile})=>{
    const isSerial =movieFile.media&& movieFile.media.map(media=>media.title[0])

    return(
        <>
            {movieFile.media && isSerial.length>0 && isSerial[0] !==undefined
                ? <Link to={"/series"}>
                    <ButtonMovie title={"Смотреть"} >
                        <Play/>
                    </ButtonMovie>
                </Link>
                : <MovieFilm movieFile={movieFile}/>}
        </>
    )
}