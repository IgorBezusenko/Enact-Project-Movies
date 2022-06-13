import React from "react";
import {Link, useHistory} from "react-router-dom";
import {ButtonMovie} from "../../Buttons/ButtonMovie";
import {Play} from "react-feather";
import css from "../../Buttons/ButtonMovie.module.less"
import {clearVideoUrl, getVideoUrl} from "../../../redux/actions";
import {useDispatch} from "react-redux";

export const MovieFilm = ({movieFile}) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const onSelect = (item) => {
        dispatch(clearVideoUrl())
        dispatch(getVideoUrl(item))
        history.push("/player?file=" + item)
    }
    return (
        <>

            <div>
                {movieFile.media && movieFile.media.map((sel, index) => {
                    return (
                        <div key={index}>
                            {
                                sel.items.map((item, index) => {
                                    return (
                                        <Link to={"/player?file=" + item.file} key={index}>
                                            <ButtonMovie onClick={() => onSelect(item.file)} title={"Смотреть"}
                                                         className={css.btn__movie}>
                                                <Play/>
                                            </ButtonMovie>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    )
                })
                }
            </div>
        </>
    )

}
