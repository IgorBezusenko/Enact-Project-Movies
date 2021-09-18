import {CornerUpLeft} from "react-feather";
import React from "react";

import css from "./NavOnBack.module.less"
import Spottable from "@enact/spotlight/Spottable";

const OnBack = ({title, onGoBack, ...rest}) => {
    return (
        <div {...rest} >
            <div className={css.row}>
                <div className={css.icon}><CornerUpLeft/></div>
                <div className={css.ml_7 + " " + css.nav__title}> {title ? title : null}</div>
            </div>
        </div>
    )
}

export const NavOnBack = Spottable(OnBack)
