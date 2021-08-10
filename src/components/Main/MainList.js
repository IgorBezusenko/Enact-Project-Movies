import React from "react";
import css from "./Main.module.less";
import MainListItem from "./MainListItem";
import {Link, useHistory} from "react-router-dom";
import Slider from "react-slick";
import Scroller from "@enact/moonstone/Scroller";
import {ItemBase} from "../Buttons/ItemBase";

const MainList = ({moviesList}) => {
    let history = useHistory();
    const onSelectHandler = (e,path) => {
        // console.log("item.url",item.url)
        if (e.code === "Enter") {
            history.push(path)
        }

    }

    return (
        <div className={css.main__list} >

                <ItemBase className={css.on__title__focus} onKeyDown={(e)=>onSelectHandler(e,"/category?cid="+moviesList.cid)}>
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
