import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMovieFile} from "../../../redux/actions";
import css from "../Main.module.less"
import {useQuery} from "../../../utils/useQuery";
import {Link} from "react-router-dom";
import {NavOnBack} from "../../NavOnBack/NavOnBack";
import {ButtonPlay} from "../../Buttons/ButtonPlay";
import {ButtonMovie} from "../../Buttons/ButtonMovie";
import {Bookmark, Clock} from "react-feather";


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

    console.log("movieFile", movieFile.media)


    return (
        <>
            <div className={css.container}>
                <NavOnBack onGoBack={onBackHandler}/>
                <div className={css.preview__row}>
                    <div>

                        <ButtonPlay movieFile={movieFile} />
                        <ButtonMovie title={"Продолжить"}><Clock/></ButtonMovie>
                        <ButtonMovie title={"Избранное"}><Bookmark/></ButtonMovie>
                        <Link to={"/description"}><h3>Go to description</h3></Link>
                    </div>
                    <div><img src={movieFile.logo} width={"400px"} alt="Logo"/></div>
                </div>
            </div>

        </>
    )

}