import React from "react";
import css from "./Main.module.less";
import {Link} from "react-router-dom";

const MainListItem = ({item}) => {

    return (
        <>
            <div className={css.item__cover}>

                <Link to={item.url}>
                    <img src={item.logo} alt=""/>
                </Link>

            </div>
            <div className={css.item__details}>
                <div>{item.year} | {!!item.access ? "Подписка" : "Бесплатный"}</div>
                <div>{!!item.rate_age && item.rate_age} {item.title}</div>
            </div>
        </>
    )
}


export default MainListItem