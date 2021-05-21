import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMovieFile} from "../../../redux/actions";
import {useLocation} from "react-router-dom";
import {MovieItem} from "./MovieItem/MovieItem";

import css from "../Main.module.less"
import {MoviesDescription} from "./MoviesDescription";

export const Movies = () => {
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    let movieFileId = query.get("id")

    const dispatch = useDispatch()
    const state = useSelector(state => state.mainReducer)
    const {movieFile, isFetching,} = state

    const getMovieFileById = (id) => {
        dispatch(getMovieFile(id))
    }
    useEffect(() => {
        getMovieFileById(movieFileId)
    }, [movieFileId])


    if (isFetching) {
        return <div>Loading</div>
    }

    console.log(movieFile)


    return (
        <>
            {/*{movieFile.media ? movieFile.media : null}*/}
            <div className={css.row}>

                <div>
                    {movieFile.media ? <MovieItem movieFile={movieFile}/> : null}
                    <div> {movieFileId}</div>
                    <MoviesDescription/>

                </div>
                <div ><img src={movieFile.logo} width={"400px"} alt="Logo"/></div>


            </div>


        </>
    )

}