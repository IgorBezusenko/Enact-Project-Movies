import React, {useState} from 'react';
import css from "./Banner.module.less";
import Scroller from "@enact/sandstone/Scroller";
import {useHistory} from "react-router-dom";
import {setCategoryId} from "../../../redux/actions";
import {useDispatch} from "react-redux";
import {BannerItem} from "./BannerItem";

export const Banner = ({moviesList}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [indexFocus, setIndexFocus] = useState(0)

    const goPath = (path) => history.push(path)
    const onClickItem = (url) => {
        dispatch(setCategoryId(url.split("=")[1]))
        goPath(url)
    }
    return (
        <div className={css.row__container}>
            <Scroller>
                <div className={css.row}>
                    {moviesList.items.map((item, idx, arr) => {
                        return (
                            <BannerItem className={css.banner__item}
                                        item={item}
                                        arrLength={arr.length - 1}
                                        onClick={() => onClickItem(item.url)}
                                        index={idx}
                                        key={idx}
                                        setIndexFocus={setIndexFocus}
                                        indexFocus={indexFocus}
                                        onFocus={() => {
                                            setIndexFocus(idx)
                                        }}
                            />
                        )
                    })
                    }
                </div>
            </Scroller>
        </div>
    );
}

