import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMovieFile} from "../../../redux/actions";
import {useLocation} from "react-router-dom";


export const Movies = () => {

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
        let query = useQuery();
        let movieFileId = query.get("id")

        const dispatch = useDispatch()
        const state = useSelector(state => state.mainReducer)
        const {movieFile, isFetching} = state

        const getMovieFileById = (id) => {
            dispatch(getMovieFile(id))
        }
        useEffect(() => {
            getMovieFileById(movieFileId)
        }, [movieFileId])



        if (isFetching) {
            return <div>Loading</div>
        }
        return (
            <>
                {/*{movieFile.media ? movieFile.media : null}*/}
                <div> {movieFileId}
                    <div>
                        <div> {}</div>
                        <div> {movieFile.title}</div>
                        <div> {movieFile.year}</div>
                        <div> {movieFile.review}</div>
                        <div><img src={movieFile.logo} alt="Logo"/></div>
                    </div>


                </div>


            </>
        )
    }