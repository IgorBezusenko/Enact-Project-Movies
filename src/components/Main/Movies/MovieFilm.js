import React from "react";
import {Link, useHistory} from "react-router-dom";
import {ButtonMovie} from "../../Buttons/ButtonMovie";
import {Play} from "react-feather";
import css from "../../Buttons/ButtonMovie.module.less"

export const MovieFilm = ({movieFile}) => {
    const history = useHistory()

    const onSelect = (e,item) => {
        if (e.code === "Enter") {
            history.push("/player?file=" + item)
        }
    }
    return (
        <>

            <div>
                {movieFile.media && movieFile.media.map(sel => {
                    return (
                        <>
                            {
                                sel.items.map((item,index) => {
                                    return (
                                        <>
                                            <Link to={"/player?file=" + item.file} key={index}>
                                                <ButtonMovie onKeyDown={(e) => onSelect(e,item.file)} title={"Смотреть"} className={css.btn__movie} >
                                                    <Play/>
                                                </ButtonMovie>
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
        </>
    )

}
