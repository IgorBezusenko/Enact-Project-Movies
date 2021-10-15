import React, {useEffect, useRef, useState} from "react";
import css from "./Main.module.less";
import cssCategory from "./Category/Category.module.less"
import {Link, useHistory} from "react-router-dom";
import Spottable from "@enact/spotlight/Spottable";
import {useSelector} from "react-redux";

const MainListItemBase =
    ({item, itemIndex, ...rest}) => {
        let history = useHistory();
        const {currentItem} = useSelector(state => state.mainReducer)
        const [focusItem, setFocusItem] = useState(3)
        const selectCard = useRef(null)

        useEffect(() => {
            onSelectCardRef()
        }, [])

        useEffect(() => {
            onSelectCardRef()
        }, [currentItem, focusItem])


        const onSelectHandler = (e, path) => {
            if (e.code === "Enter") {
                history.push(path)
            }
        }

        const onSelectCardRef = () => {
            if (history.location.pathname === "/main") setFocusItem(3)
            if (history.location.pathname !== "/main") setFocusItem(2)
            if (itemIndex === focusItem) {
                selectCard.current.focus();
            }
        }
        const visibleDescription = history.location.pathname === "/category" || history.location.pathname === "/app-search" || history.location.pathname === "/search-panel" || history.location.pathname === "/history" || history.location.pathname === "/bookmark"

        return (
            <>
                <div   {...rest}
                       onKeyPress={(e) => onSelectHandler(e, item.url)}
                       ref={selectCard}
                >
                    {
                        !item.id &&
                        <div className={css.item__last}>
                            <Link to={item.url}>Смотреть все</Link>
                        </div>
                    }
                    {
                        item.id &&
                        <div className={css.item__cover}>
                            <Link to={item.url}>
                                <img src={item.logo} alt="item"/>
                            </Link>
                        </div>
                    }
                    {
                        visibleDescription ?
                            <div className={css.item__details}>
                                <div>{item.year} | {!!item.access ?
                                    <span className={cssCategory.follow}>Подписка</span> :
                                    <span className={cssCategory.free}>Бесплатный</span>}</div>
                                <div className={css.nowrap}>{!!item.rate_age && item.rate_age} {item.title}</div>
                            </div>
                            : null
                    }

                </div>

            </>
        )
    }

const MainListItem = Spottable(MainListItemBase)

export default MainListItem
