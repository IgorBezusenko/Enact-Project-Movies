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
    const genre = movieFile.genre && movieFile.genre.map((genre, i) => {
        return (<>
            {i !== 0 && ", "}{genre.name}
        </>)
    })

    console.log("movieFile", movieFile)


    return (
        <>
            <div className={css.container}>
                <NavOnBack onGoBack={onBackHandler}/>
                <div className={css.preview__row}>
                    <div>
                        <h2>{movieFile.title}</h2>
                        <div>{movieFile.year} </div>
                        <div>{genre}</div>
                        <br/>
                        <ButtonPlay movieFile={movieFile}/>
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