import React from "react";
import {AppFilter} from "./AppFilter";

export const CategoryFilter = (props) => {
    const onBackHandler = () => props.history.goBack()
    return (
        <AppFilter title={"Фильтр"} onGoBack={onBackHandler}>
           abkmnhdsd
        </AppFilter>
    )
}
