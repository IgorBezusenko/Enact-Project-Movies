import css from "./ButtonMovie.module.less"
import Spottable from "@enact/spotlight/Spottable";

const LikeGroupBase = ({title,range=0, children, ...rest}) => {
    return (
        <div  {...rest}  >
            <div className={css.row}>{children}<div className={css.range__like}>{range}</div></div>
            <div className={css.text__like}>{title}</div>
        </div>)
}

export const LikeGroup = Spottable(LikeGroupBase)
