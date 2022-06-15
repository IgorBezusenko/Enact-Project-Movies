import React, {useEffect, useLayoutEffect, useRef} from "react";
import css from "./Banner.module.less";
import {Link} from "react-router-dom";
import Spottable from "@enact/spotlight/Spottable";

const BannerItemBase = ({item, onClickItem, index, arrLength, indexFocus, setIndexFocus, ...rest}) => {
    const focusRef = useRef(null)

    useEffect(() => {
        const interval = setTimeout(() => {
            if (indexFocus >= arrLength) {
                setIndexFocus(0)
            } else {
                setIndexFocus(v => ++v)
            }
        }, 10000)
        return () => {
            clearTimeout(interval)
        }
    }, [indexFocus])

    useLayoutEffect(() => {
        if (index === indexFocus) {
            focusRef.current.focus()
            focusRef.current.scrollIntoView(
                {block: "center", behavior: "smooth", inline: "center"}
            )
        }
    }, [indexFocus])

    return (
        <div ref={focusRef} {...rest}>
            <div className={css.banner}>
                <Link to={item.url}>
                    <img src={item.logo} alt="item"/>
                </Link>
            </div>
        </div>
    )
}

export const BannerItem = Spottable(BannerItemBase)
