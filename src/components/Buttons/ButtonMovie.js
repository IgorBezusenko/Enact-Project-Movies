import css from "./ButtonMovie.module.less"
import Spottable from "@enact/spotlight/Spottable";
import {useEffect, useRef} from "react";

const MovieBtn = ({title, children,  ...rest}) => {
    const selectPlay = useRef(null)
    useEffect(()=>{
        if (title==="Смотреть") {
            selectPlay.current.focus()
        }
    },[])

    return (
        <div  {...rest} ref={selectPlay} >
            <button className={css.btn__movie}>{children}</button>
            <div className={css.text__movie}>{title}</div>
        </div>)
}

export const ButtonMovie = Spottable(MovieBtn)
