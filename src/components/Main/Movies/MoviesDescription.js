import {useSelector} from "react-redux";
import React from "react";
import {NavOnBack} from "../../NavOnBack/NavOnBack";

import css from "./MoviesDescription.module.less"
import {useHistory} from "react-router-dom";

export const MoviesDescription = () => {
    const history = useHistory()
    const movieFile = useSelector(state => state.mainReducer.movieFile)

    const country = movieFile.country && movieFile.country.map((country, i) => {
        return (<span key={i}>
            {i !== 0 && ", "} {country}
        </span>)
    })
    const genre = movieFile.genre && movieFile.genre.map((genre, i) => {
        return (<span key={i}>
            {i !== 0 && ", "}{genre.name}
        </span>)
    })
    const creator = movieFile.creator && movieFile.creator.map((creator, i) => {
        return (<span key={i}>
            {creator.name}
        </span>)
    })
    const producer = movieFile.producer && movieFile.producer.map((producer, i) => {
        return (<span key={i}>
            {producer.name}
        </span>)
    })
    const in_the_roles = movieFile.in_the_roles && movieFile.in_the_roles.map((in_the_roles, i) => {
        return (<span key={i}>
           {in_the_roles.name}
        </span>)
    })

    const onGoPath = (path) => history.push(path)
    const onSelect = (e, push) => {
        console.log(push)
        if (e.code === "ArrowUp") {
            onGoPath(push)
        }
    }

    return (
        <div style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${movieFile.logo})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 0",
            backgroundSize: "cover",
        }}>
            <div className={css.container}>
                <NavOnBack
                    onClick={() => onGoPath("/detail")}
                    onKeyDown={(e => onSelect(e, "/detail"))}
                    className={css.on__back} title={movieFile.title}/>

                <div className={css.description}>
                    <div><span className={css.description__title}>Год:</span> {movieFile.year}</div>
                    <div><span className={css.description__title}>Жанр: </span>{genre}</div>
                    <div><span className={css.description__title}>Страна: </span>{country}</div>

                    <div className={css.description__review}>{movieFile.review}</div>

                    <div className={css.description__row}>
                        <div className={css.description__col}>
                            <div className={css.description__title}>Режиссер:</div>
                            <div className={css.description__text}>{creator}</div>
                        </div>
                        <div className={css.description__col}>
                            <div className={css.description__title}>Продюссер:</div>
                            <div className={css.description__text}>{producer}</div>
                        </div>
                        <div className={css.description__col}>
                            <div className={css.description__title}>В ролях:</div>
                            <div className={css.description__text}>{in_the_roles} </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
