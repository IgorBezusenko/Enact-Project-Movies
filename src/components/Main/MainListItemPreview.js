import React from "react";
import css from "./Main.module.less";
import {Link, useHistory} from "react-router-dom";
import Spottable from "@enact/spotlight/Spottable";

export const MainListItemPreview = ({item,...rest}) => {

    return (
        <>
            <div {...rest}>
                <div>
                    {
                        !item.id && <div className={css.item__last}>
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

                </div>
            </div>

        </>
    )
}

