import Spottable from "@enact/spotlight/Spottable";
import css from "./Form.module.less"

const AuthButtonBase = ({title, children, ...rest}) => {
    return (
        <div  {...rest}  >
            <button className={css.auth__button}>
                {children}
                <div className={css.auth__text}>{title}</div>
            </button>


        </div>)
}

export const AuthButton = Spottable(AuthButtonBase)
