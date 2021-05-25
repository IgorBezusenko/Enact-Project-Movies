import {CornerUpLeft} from "react-feather";
import React from "react";

import css from "./NavOnBack.module.less"

export const NavOnBack=(props)=>{
    return(
        <div className={css.row} onClick={props.onGoBack}>
            <CornerUpLeft size={50}/>
            <h2 className={css.ml_7} > {props.title ? props.title : null}</h2>
        </div>
    )
}