import React from "react";
import {ItemBase} from "../Buttons/ItemBase";
import css from "./AppFilter.module.less"

export const AppFilter = ({title,onGoBack,children}) => {

    const onSelectHandler = (e) => {
        if (e.code === "Enter") {
            onGoBack()
        }
    }

    return (
        <div className={css.container}>
            <div className={css.title}>
                <h1>{title}</h1>
                <ItemBase className={css.on__close}
                          onClick={onGoBack}
                          onKeyDown={(e) => onSelectHandler(e)}><span></span></ItemBase>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}
