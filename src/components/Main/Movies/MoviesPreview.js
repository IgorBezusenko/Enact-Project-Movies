import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMovieFile} from "../../../redux/actions";
import {useQuery} from "../../../utils/useQuery";
import {useHistory} from "react-router-dom";
import {NavOnBack} from "../../NavOnBack/NavOnBack";
import {ButtonPlay} from "../../Buttons/ButtonPlay";
import {ButtonMovie} from "../../Buttons/ButtonMovie";
import {Bookmark, Clock} from "react-feather";

import css from "./MoviesPreveiw.module.less"
import cssSpottable from "../../Buttons/ButtonMovie.module.less"
import {ButtonDescription} from "../../Buttons/ButtonDescription";


export const MoviesPreview = (props) => {

    const query = useQuery();
    const movieFileId = query.get("id")

    const dispatch = useDispatch()
    const history = useHistory()
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
        return (<span key={i}>
            {i !== 0 && ", "}{genre.name}
        </span>)
    })

    const onSelect = (e) => {
        console.log("onSelect")
        if (e.code === "Enter") {
            history.push("/description")
        }
    }


    return (
        <div style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${movieFile.logo})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 0",
            backgroundSize: "cover"
        }}>
            <div className={css.container}>
                <NavOnBack className={css.on__back} onGoBack={onBackHandler}/>
                <div className={css.preview__row}>
                    <div>
                        <h2>{movieFile.title}</h2>
                        <div>{movieFile.year} </div>
                        <div>{genre}</div>
                        <br/>
                        <div className={css.button__group}>
                            <ButtonPlay movieFile={movieFile}/>
                            <ButtonMovie className={cssSpottable.btn__movie} title={"Продолжить"}><Clock/></ButtonMovie>
                            <ButtonMovie className={cssSpottable.btn__movie}
                                         title={"Избранное"}><Bookmark/></ButtonMovie>

                        </div>
                        <div className={css.rating}>
                            <div className={css.rating__kp}>
                                <div>{movieFile.rate_kp}</div>
                                <div>КиноПоиск</div>
                            </div>
                            <div className={css.rating__imbd}>
                                <div>{movieFile.rate_imdb}</div>
                                <div>IMBb</div>
                            </div>

                        </div>


                    </div>
                    <div><img src={movieFile.logo} width={"400px"} alt="Logo"/></div>
                </div>
                <ButtonDescription/>
            </div>

        </div>
    )

}

