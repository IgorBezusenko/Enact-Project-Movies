import React from "react";
import css from "./Main.module.less";
import MainListItem from "./MainListItem";
import {Link} from "react-router-dom";
import {ItemBase} from "../Header/Header";
import Slider from "react-slick";
import Scroller from "@enact/moonstone/Scroller";

const MainList = ({moviesList}) => {
    return (
        <div className={css.main__list}>

                <ItemBase className={css.on__title__focus}>
                <Link to={"/category?cid="+moviesList.cid}> <h1>{moviesList.title}</h1></Link>
                </ItemBase>

                    <div className={css.row}>
                        {moviesList.items.map((item, idx) => {
                            return (

                                    <MainListItem  key={idx} className={css.list__item} item={item}/>

                            )
                        })}
                    </div>



        </div>

    )
}


export default MainList
