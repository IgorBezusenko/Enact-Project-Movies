import React from "react";
import css from "./Main.module.less";
import {Link, useHistory} from "react-router-dom";
import Spottable from "@enact/spotlight/Spottable";

const MainListItemBase = ({item, ...rest}) => {
    let history = useHistory();

    const onSelectHandler = (e) => {
        console.log("item.url",item.url)
        if (e.code === "Enter") {
            history.push(`${item.url}`)
        }
        if (e.code==="ArrowLeft"){
            return true;
        }
    }
    return (
        <div   {...rest} onKeyDown={onSelectHandler}>
            <div className={css.item__cover}>

                <Link to={item.url}>
                    <img src={item.logo} alt="item"/>
                </Link>

            </div>
            <div className={css.item__details}>
                <div>{item.year} | {!!item.access ? "Подписка" : "Бесплатный"}</div>
                <div>{!!item.rate_age && item.rate_age} {item.title}</div>
            </div>
        </div>
    )
}
const MainListItem = Spottable(MainListItemBase)

export default MainListItem
