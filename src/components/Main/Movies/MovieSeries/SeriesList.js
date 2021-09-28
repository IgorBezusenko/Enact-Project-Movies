import {Link} from "react-router-dom";
import {ButtonSpotTable} from "../../../Buttons/ButtonSpotTable";
import css from "./MovieSeries.module.less";
import React from "react";

export const SeriesList = ({seasonSel, onSelectSeries}) => {
    return seasonSel.map(sel => {
        // console.log("seasonSel", seasonSel)
        // console.log("sel", sel)
        return sel.items.map((item, index) => {
            // console.log(item)
            return (
                <Link to={"/player?file=" + item.file} key={index}>
                    <ButtonSpotTable
                        className={css.btn + " " + css.btn__series}
                        onKeyDown={(e) => onSelectSeries(e, "/player?file=" + item.file)}
                    >{item.title}</ButtonSpotTable>
                </Link>
            )
        })
    })
}

