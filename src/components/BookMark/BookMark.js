import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getBookmarkItems, setNewBookmarkPage} from "../../redux/actions";
import css from "../Main/Category/Category.module.less";
import {Header} from "../Header/Header";
import {NavOnBack} from "../NavOnBack/NavOnBack";
import {useHistory} from "react-router-dom";
import MainListItem from "../Main/MainListItem";

export const BookMark = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const {bookmarkItems, limitBookmark} = useSelector((state) => state.bookmarkReducer)

    useEffect(() => {
        dispatch(getBookmarkItems(limitBookmark))
    }, [])

    useEffect(() => {
        if (limitBookmark !== 15) {
            dispatch(getBookmarkItems(limitBookmark))
        }
    }, [limitBookmark])

    const onFocusHandler = (index, array) => {
        if (Math.ceil(index / 5) === Math.ceil(array.length / 5)) {
            dispatch(setNewBookmarkPage())
        }
    }

    const onBackHandler = (path) => history.push(path)
    return (
        <>
            <div className={css.container}>
                <Header/>

                <div className={css.row}>
                    <NavOnBack className={css.on__back} title={"Избранное"} onGoBack={() => onBackHandler("/main")}/>
                </div>

                <div className={css.list}>
                    {bookmarkItems && bookmarkItems.map((item, idx) => {
                        return (
                            <MainListItem key={idx}
                                          onFocus={() => onFocusHandler(idx, bookmarkItems)}
                                          className={css.list__item} item={item}/>

                        )
                    })}
                </div>
            </div>

        </>
    )
}
