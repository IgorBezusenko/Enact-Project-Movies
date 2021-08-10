import React from "react";
import {AppFilter} from "./AppFilter";
import css from "../Main/Category/Category.module.less";
import {List} from "react-feather";
import {ButtonBase} from "../Buttons/ButtonBase";

export const CategoryFilter = (props) => {
    const onBackHandler = () => props.history.goBack()
    return (
        <AppFilter title={"Фильтры"} onGoBack={onBackHandler}>


        </AppFilter>
    )
}
