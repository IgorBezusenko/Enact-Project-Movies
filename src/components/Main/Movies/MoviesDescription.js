import {useSelector} from "react-redux";
import React from "react";
import {NavOnBack} from "../../NavOnBack/NavOnBack";

import css from "../Main.module.less"

export const MoviesDescription = (props) => {
    const movieFile = useSelector(state => state.mainReducer.movieFile)
    if (movieFile) {
        console.log("movieFile", movieFile)
        const country = movieFile.country.map((country, i) => {
            return (<>
                {i !== 0 && ", "} {country}
            </>)
        })
        const genre = movieFile.genre.map((genre, i) => {
            return (<>
                {i !== 0 && ", "}{genre.name}
            </>)
        })
        const creator = movieFile.creator.map((creator, i) => {
            return (<>
                {i !== 0 && ", "}{creator.name}
            </>)
        })
        const producer = movieFile.producer.map((producer, i) => {
            return (<>
                {i !== 0 && ", "} {producer.name}
            </>)
        })
        const in_the_roles = movieFile.in_the_roles.map((in_the_roles, i) => {
            return (<>
                {i !== 0 && ", "}  {in_the_roles.name}
            </>)
        })

        const onBackHandler = () => props.history.goBack()

        return (
            <div className={css.container}>
                <NavOnBack onGoBack={onBackHandler} title={movieFile.title}/>

                <div>Год: {movieFile.year}</div>
                <br/>
                <div>Жанр: {genre}</div>
                <br/>
                <div>Страна: {country}</div>
                <br/>
                <div> {movieFile.review}</div>
                <br/>
                <div>Режиссер: {creator}</div>
                <br/>
                <div>Продюссер: {producer}</div>
                <br/>
                <div>В ролях: {in_the_roles}</div>
                <br/>

            </div>
        )
    }
}