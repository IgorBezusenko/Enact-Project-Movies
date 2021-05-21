import {useSelector} from "react-redux";
import React from "react";

export const MoviesDescription = ()=>{
    const movieFile = useSelector(state => state.mainReducer.movieFile)
    return(
        <>
            <div> {movieFile.title}</div>
            <div>Год: {movieFile.year}</div>
            <div> {movieFile.review}</div>
        </>
    )
}