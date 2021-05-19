import React from "react";
import css from "./Main.module.less";
import MainListItem from "./MainListItem";

const MainList = ({moviesList}) => {

    return (
        <>
            <div className={css.moviesPanel}>
                <h1> {moviesList.title}</h1>
                <>
                    <div className={css.row}>
                        {moviesList.items.map((item, idx) => {
                            return (
                                <div className={css.list__item} key={idx}>
                                    <MainListItem item={item}/>
                                </div>
                            )
                        })}
                    </div>
                </>
            </div>

        </>

    )
}


export default MainList