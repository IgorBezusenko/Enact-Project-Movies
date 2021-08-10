import React from "react";
import {ItemBase} from "../Buttons/ItemBase";
import css from "./AppFilter.module.less"
import {AppFilter} from "./AppFilter";

export const CategorySort = (props) => {
    const onBackHandler = () => props.history.goBack()
    return(
        <AppFilter title={"Сортировать"} onGoBack={onBackHandler}>
asdd
        </AppFilter>
    )
}
