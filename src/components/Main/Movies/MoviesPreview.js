import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMovieFile} from "../../../redux/actions";
import {MovieSeries} from "./MovieSeries";

import css from "../Main.module.less"
import {useQuery} from "../../../utils/useQuery";
import {Link} from "react-router-dom";
import {NavOnBack} from "../../NavOnBack/NavOnBack";

export const MoviesPreview = (props) => {
    const query = useQuery();
    const movieFileId = query.get("id")

    const dispatch = useDispatch()
    const state = useSelector(state => state.mainReducer)
    const {movieFile, isFetching,} = state

    const getMovieFileById = (id) => {
        dispatch(getMovieFile(id))
    }
    useEffect(() => {
        getMovieFileById(movieFileId)
    }, [movieFileId])

    const onBackHandler = () => props.history.goBack()

    if (isFetching) {
        return <div>Loading</div>
    }


    return (
        <>
            <div>
                <NavOnBack onGoBack={onBackHandler}/>
                {movieFile.media ? <MovieSeries movieFile={movieFile}/> : null}
                <Link to={"/description"}><h3>Go to description</h3></Link>

                <div className={css.row}>
                    <div><img src={movieFile.logo} width={"400px"} alt="Logo"/></div>
                </div>


            </div>


        </>
    )

}