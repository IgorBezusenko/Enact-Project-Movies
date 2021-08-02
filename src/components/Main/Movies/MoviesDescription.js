import {useSelector} from "react-redux";
import React from "react";
import {NavOnBack} from "../../NavOnBack/NavOnBack";

import css from "./MoviesDescription.module.less"

export const MoviesDescription = (props) => {
    const movieFile = useSelector(state => state.mainReducer.movieFile)
    const onBackHandler = () => props.history.goBack()

    const country = movieFile.country && movieFile.country.map((country, i) => {
        return (<>
            {i !== 0 && ", "} {country}
        </>)
    })
    const genre = movieFile.genre && movieFile.genre.map((genre, i) => {
        return (<>
            {i !== 0 && ", "}{genre.name}
        </>)
    })
    const creator = movieFile.creator && movieFile.creator.map((creator, i) => {
        return (<>
            {i !== 0 && ", "}{creator.name}
        </>)
    })
    const producer = movieFile.producer && movieFile.producer.map((producer, i) => {
        return (<>
            {i !== 0 && ", "} {producer.name}
        </>)
    })
    const in_the_roles = movieFile.in_the_roles && movieFile.in_the_roles.map((in_the_roles, i) => {
        return (<>
            {i !== 0 && ", "} {in_the_roles.name}
        </>)
    })


    return (
        <div style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${movieFile.logo })`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 0",
            backgroundSize: "cover",
        }}>
            <div className={css.container}>
                <NavOnBack onGoBack={onBackHandler} className={css.on__back} title={movieFile.title}/>

              <div className={css.description}>
                  <div><span className={css.title}>Год:</span> {movieFile.year}</div>
                  <br/>
                  <div><span className={css.title}>Жанр: </span>{genre}</div>
                  <br/>
                  <div><span className={css.title}>Страна: </span>{country}</div>
                  <br/>
                  <div>{movieFile.review}</div>
                  <br/>
                  <div><span className={css.title}>Режиссер: </span>{creator}</div>
                  <br/>
                  <div><span className={css.title}>Продюссер: </span>{producer}</div>
                  <br/>
                  <div><span className={css.title}>В ролях: </span>{in_the_roles}</div>
                  <br/>
              </div>

            </div>
        </div>
    )
}
