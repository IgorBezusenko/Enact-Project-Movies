import Spottable from "@enact/spotlight/Spottable";
import React from "react";

const Component = ({children, ...rest}) => {
    return (<div {...rest}>{children}</div>)
}

export const ItemBase = Spottable(Component)
