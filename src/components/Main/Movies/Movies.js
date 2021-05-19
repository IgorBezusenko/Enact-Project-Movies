import React, {useEffect} from "react";
import {useParams,} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getMovieFile} from "../../../redux/actions";

export const Movies = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const movieFile = useSelector(state=>state.mainReducer.movieFile)

    useEffect(()=>{
        dispatch(getMovieFile(params.id))
    },[params.id])

    console.log("asdadadas",movieFile.media)

    return (
        <>
            <div> {params.id} </div>
            <div> {}</div>
            <div> {movieFile.title}</div>
            <div> {movieFile.year}</div>
            <div> {movieFile.review}</div>
            <div><img src={movieFile.logo} alt="Logo"/></div>


        </>
    )
}