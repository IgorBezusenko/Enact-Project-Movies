import Spottable from "@enact/spotlight/Spottable";

const ButtonSpottable = ({ children, ...rest}) => {
    return (
        <button {...rest}>{children}</button>
    )
}

export const ButtonBase = Spottable(ButtonSpottable)
