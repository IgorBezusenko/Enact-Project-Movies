import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMovieFile, putLikeAC, setVote} from "../../../redux/actions";
import {useQuery} from "../../../utils/useQuery";
import {useHistory} from "react-router-dom";
import {NavOnBack} from "../../NavOnBack/NavOnBack";
import {ButtonPlay} from "../../Buttons/ButtonPlay";
import {ButtonMovie} from "../../Buttons/ButtonMovie";
import {Bookmark, Clock, ThumbsDown, ThumbsUp} from "react-feather";

import css from "./MoviesPreveiw.module.less"
import cssSpottable from "../../Buttons/ButtonMovie.module.less"
import {ButtonDescription} from "../../Buttons/ButtonDescription";
import {LikeGroup} from "../../Buttons/LikeGroup";

export const MoviesPreview = (props) => {
    const query = useQuery();
    const movieFileId = query.get("id")
    const dispatch = useDispatch()
    const history = useHistory()
    const state = useSelector(state => state.mainReducer)
    const voteState = useSelector(state => state.likeReducer.vote)
    // console.log("voteState", voteState)
    const {movieFile, isFetching,} = state
    // console.log(movieFile)

    const getMovieFileById = (id) => {
        dispatch(getMovieFile(id))
    }
    useEffect(() => {
        getMovieFileById(movieFileId)
    }, [movieFileId])

    useEffect(() => {
        if (movieFile.vote) {
            dispatch(setVote({myVote: movieFile.my_vote, ...movieFile.vote}))
        }
    }, [movieFile.my_vote])

    const onBackHandler = () => props.history.goBack()

    if (isFetching) {
        return <div>Loading</div>
    }
    const genre = movieFile.genre && movieFile.genre.map((genre, i) => {
        return (<span key={i}>
            {i !== 0 && ", "}{genre.name}
        </span>)
    })
    const country = movieFile.country && movieFile.country.map((country, i) => {
        return (<span>
            {i !== 0 && ", "} {country}
        </span>)
    })
    const vote = movieFile.vote ? movieFile.vote : {}
    // console.log("vote", vote)

    const onSelect = (e) => {
        console.log("onSelect")
        if (e.code === "Enter") {
            history.push("/description")
        }
    }
    // console.log("voteState", voteState)
    // console.log("movieFile", movieFile)
    const onPutLike = (id, vote) => {
        console.log(id)
        if (voteState && voteState.myVote === vote) {
            dispatch(putLikeAC(id, 0))
        } else {
            dispatch(putLikeAC(id, vote))
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
                        <div className={css.description}>
                            <h1>{movieFile.title}</h1>
                            <div>{movieFile.year} </div>
                            <div>{genre}</div>
                            <div>{country}</div>
                        </div>
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
                    <div><img src={movieFile.logo} width={"500px"} alt="Logo"/>
                        <div className={css.button__group}>
                            <LikeGroup
                                onClick={() => {
                                    onPutLike(movieFile.id, 3)
                                }} className={cssSpottable.btn__like}
                                title={"отлично"}
                                range={voteState && voteState.vote ? voteState.vote.like : vote.like}
                            >
                                <ThumbsUp
                                    className={css.like + " " + `${voteState && voteState.myVote === 3 && css.active}`}/>
                            </LikeGroup>

                            <LikeGroup
                                onClick={() => {
                                    onPutLike(movieFile.id, 2)
                                }} className={cssSpottable.btn__like}
                                title={"хорошо"}
                                range={voteState && voteState.vote ? voteState.vote.ats : vote.ats}
                            >
                                <span><ThumbsUp
                                    className={css.like + " " + `${voteState && voteState.myVote === 2 && css.active}`}/><ThumbsDown
                                    className={css.deslike + " " + `${voteState && voteState.myVote === 2 && css.active}`}/></span>
                            </LikeGroup>

                            <LikeGroup
                                onClick={() => {
                                    onPutLike(movieFile.id, 1)
                                }}
                                className={cssSpottable.btn__like}
                                title={"плохо"}
                                range={voteState && voteState.vote ? voteState.vote.dislike : vote.dislike}
                            >
                                <ThumbsDown
                                    className={css.deslike + " " + `${voteState && voteState.myVote === 1 && css.active}`}/>
                            </LikeGroup>
                        </div>
                    </div>
                </div>
                <ButtonDescription/>
            </div>

        </div>
    )

}

