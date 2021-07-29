import {CornerUpLeft} from "react-feather";
import React from "react";

import css from "./NavOnBack.module.less"
import Spottable from "@enact/spotlight/Spottable";

const OnBack = ({title, onGoBack, ...rest}) => {
    return (
        <div {...rest}   onClick={onGoBack} onKeyDown={(e)=>{
            if (e.code==="Enter"){
                onGoBack()
            }
            if (e.code==="ArrowUp"){
                onGoBack()
            }
        }}>

            <div className={css.row}><div className={css.icon}><CornerUpLeft/></div><h2 className={css.ml_7 + " " + css.nav__title}> {title ? title : null}</h2></div>
        </div>
    )
}

export const NavOnBack = Spottable(OnBack)
