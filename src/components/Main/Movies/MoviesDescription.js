import {useSelector} from "react-redux";
import React from "react";
import {CornerUpLeft} from "react-feather";
import {NavOnBack} from "../../NavOnBack/NavOnBack";

export const MoviesDescription = (props) => {
    const movieFile = useSelector(state => state.mainReducer.movieFile)
    if (movieFile) {
        console.log("movieFile", movieFile)
        const country = movieFile.country.map((country, i) => {
            return (<>
                {country}{i === movieFile.country.length - 1 ? "" : ", "}
            </>)
        })
        const genre = movieFile.genre.map((genre, i) => {
            return (<span>
                {genre.name}{i === movieFile.genre.length - 1 ? "" : ", "}
            </span>)
        })
        const creator = movieFile.creator.map((creator, i) => {
            return (<span>
                {creator.name}{i === movieFile.creator.length - 1 ? "" : ", "}
            </span>)
        })
        const producer = movieFile.producer.map((producer, i) => {
            return (<span>
                {producer.name}{i === movieFile.producer.length - 1 ? "" : ", "}
            </span>)
        })
        const in_the_roles = movieFile.in_the_roles.map((in_the_roles, i) => {
            return (<span>
                {in_the_roles.name}{i === movieFile.in_the_roles.length - 1 ? "" : ", "}
            </span>)
        })
        const onBackHandler = () => props.history.goBack()
        return (
            <div>
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