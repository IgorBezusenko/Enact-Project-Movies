import React from 'react';
import css from "./ButtonMovie.module.less";
import Spottable from "@enact/spotlight/Spottable";


export function Icon({children, ...rest}) {
    return (<div {...rest}>
        {children}
    </div>);
}

export const IconBase = Spottable(Icon)

