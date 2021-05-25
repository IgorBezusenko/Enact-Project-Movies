import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {clearVideoUrl} from "../../../redux/actions";
import {Link} from "react-router-dom";
import {NavOnBack} from "../../NavOnBack/NavOnBack";

import css from "./MovieSeries.module.less"

export const MovieSeries = (props) => {
    const dispatch = useDispatch()
    const movieFile = useSelector(state => state.mainReducer.movieFile)
    const [state, setState] = useState('')
    const onClickToSeason = (mediaTitle) => {
        setState(mediaTitle)
        dispatch(clearVideoUrl())
    }
    const seasonSel = movieFile.media && movieFile.media.filter(sel => sel.title === state)
    const onBackHandler = () => props.history.goBack()
    return (
      <>
          <div className={css.container}>
              <NavOnBack onGoBack={onBackHandler} title={movieFile.title}/>
              <div className={css.season__row}>
                  {
                      movieFile.media && movieFile.media.map(media => {
                          return (
                              <>
                                  {media.title
                                  && <button
                                      className={css.btn + " " + css.btn__season}
                                      onClick={() => onClickToSeason(media.title)}
                                  >{media.title}</button>}
                              </>
                          )
                      })
                  }
              </div>
          </div>
          {
              state &&
              <div className={css.series__container}>
                  <div className={css.series__row}>
                      {
                          seasonSel.map(sel => {
                              return (
                                  <>
                                      {
                                          sel.items.map(item => {
                                              return (
                                                  <>
                                                      <Link to={"/player?file=" + item.file}>
                                                          <button className={css.btn + " " + css.btn__series}>{item.title}</button>
                                                      </Link>

                                                  </>
                                              )
                                          })
                                      }
                                  </>
                              )
                          })
                      }
                  </div>
              </div>
          }
      </>
    )

}