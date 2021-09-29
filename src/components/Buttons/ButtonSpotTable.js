import Spottable from "@enact/spotlight/Spottable";

const ButtonBase = ({children, ...rest}) => {
    return (
        <button {...rest}>{children}</button>
    )
}

export const ButtonSpotTable = Spottable(ButtonBase)
