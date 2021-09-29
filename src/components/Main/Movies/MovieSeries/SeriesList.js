import {Link} from "react-router-dom";
import css from "./MovieSeries.module.less";
import React from "react";
import {ButtonSeries} from "./ButtonSeries";

export const SeriesList = ({seasonSel, onSelectSeries, currentSeries}) => {
    return seasonSel.map(sel => {
        // console.log("seasonSel", seasonSel)
        // console.log("sel", sel)
        return sel.items.map((item, index) => {
            // console.log(item)
            return (
                <Link to={"/player?file=" + item.file} key={index}>
                    <ButtonSeries
                        currentSeries={currentSeries}
                        itemFocusable={item.title}
                        className={css.btn + " " + css.btn__series}
                        // onKeyDown={(e) => onSelectSeries(e, "/player?file=" + item.file)}
                        onClick={() => onSelectSeries("/player?file=" + item.file)}
                    >{item.title}</ButtonSeries>
                </Link>
            )
        })
    })
}

