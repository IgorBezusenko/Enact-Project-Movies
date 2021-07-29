import css from "./ButtonMovie.module.less"
import Spottable from "@enact/spotlight/Spottable";

 const MovieBtn = ({title, children, ...rest}) => {
    return (
        <div  {...rest}  >
            <button className={css.btn__movie}>{children}</button>
            <div className={css.text__movie}>{title}</div>
        </div>)
}

export const ButtonMovie = Spottable(MovieBtn)
