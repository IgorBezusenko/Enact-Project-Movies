import React from "react";
import css from "./Main.module.less";
import {Link, useHistory} from "react-router-dom";
import Spottable from "@enact/spotlight/Spottable";

const MainListItemBase = ({item, ...rest}) => {
    let history = useHistory();
    const onSelectHandler = (e,path) => {
        // console.log("item.url",item.url)
        if (e.code === "Enter") {
            history.push(path)
        }
    }

    const visibleDescription = history.location.pathname === "/category" || history.location.pathname ==="/app-search"|| history.location.pathname ==="/search-panel"|| history.location.pathname ==="/history"|| history.location.pathname ==="/bookmark"

    return (
       <>
           <div   {...rest}  onKeyDown={(e)=>onSelectHandler(e,item.url)}>
              <div>
                  <div className={css.item__cover}>

                      <Link to={item.url}>
                          <img src={item.logo} alt="item"/>
                      </Link>

                  </div>
                  {
                      visibleDescription ?
                      <div className={css.item__details}>
                          <div>{item.year} | {!!item.access ? <span style={{color:"#FF0000"}}>Подписка</span> : <span style={{color:"#979797"}}>Бесплатный</span>}</div>
                          <div className={css.nowrap}>{!!item.rate_age && item.rate_age} {item.title}</div>
                      </div>
                      : null
                  }
              </div>
           </div>

       </>
    )
}
const MainListItem = Spottable(MainListItemBase)

export default MainListItem
