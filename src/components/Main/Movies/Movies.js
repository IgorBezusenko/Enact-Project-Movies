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

    const SeasonSeries = ({movieFile}) => {
        // console.log(movieFile)
        return (
            <>
                {
                    movieFile.media.map(media => {
                        console.log("media", media)
                        console.log("media.title", media.title)
                        console.log("media.items", media.items)
                        return (
                            <div>
                                {media.title && <div>{media.title}</div>}
                                {
                                    media.items.map(item => {
                                            console.log(item)
                                            return (
                                                <span>
                                                      | <strong>{item.title}</strong> {item.file} |
                                                </span>
                                            )
                                        }
                                    )
                                }
                            </div>)
                    })
                }
            </>
        )

    }

    return (
        <>
            {/*{movieFile.media ? movieFile.media : null}*/}
            <div>
                {movieFile.media ? <SeasonSeries movieFile={movieFile}/> : null}
                <div>
                    <div> {movieFileId}</div>
                    <div> {movieFile.title}</div>
                    <div> {movieFile.year}</div>
                    <div> {movieFile.review}</div>
                    <div><img src={movieFile.logo} alt="Logo"/></div>
                </div>


            </div>


        </>
    )

}