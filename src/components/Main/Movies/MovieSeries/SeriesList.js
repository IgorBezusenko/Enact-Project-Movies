import {Link} from "react-router-dom";
import css from "./MovieSeries.module.less";
import React from "react";
import {ButtonSeries} from "./ButtonSeries";

export const SeriesList = ({seasonSel, onSelectSeries, currentSeries}) => {
    return seasonSel.map(sel => {
        return sel.items.map((item, index) => {
            return (
                <Link to={"/player?file=" + item.file} key={index}>
                    <ButtonSeries
                        itemFocusable={item.title}
                        className={css.btn + " " + css.btn__series}
                        onClick={() => onSelectSeries("/player?file=" + item.file)}
                    >{item.title}</ButtonSeries>
                </Link>
            )
        })
    })
}

