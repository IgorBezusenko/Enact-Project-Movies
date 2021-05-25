import {Link} from "react-router-dom";
import {MovieFilm} from "../Main/Movies/MovieFilm";
import React from "react";
import {ButtonMovie} from "./ButtonMovie";
import {Play} from "react-feather";

export const ButtonPlay = ({movieFile})=>{
    return(
        <>
            {movieFile.media && movieFile.media.length > 1
                ? <Link to={"/series"}>
                    <ButtonMovie title={"Смотреть"} >
                        <Play/>
                    </ButtonMovie>


                </Link>
                : <MovieFilm movieFile={movieFile}/>}
        </>
    )
}