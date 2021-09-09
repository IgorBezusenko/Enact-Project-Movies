import React, {useEffect} from "react";
import css from "./Main.module.less";
import MainListItem from "./MainListItem";
import {Link, useHistory} from "react-router-dom";
import {ItemBase} from "../Buttons/ItemBase";
import {useDispatch, useSelector} from "react-redux";
import {
    clearCurrentItem,
    clearMovieFileFocus,
    getCategoryFilter,
    setCategoryId,
    setCurrentItemDec,
    setCurrentItemInc,
    setMovieCategoryTitle,
    setMovieFileFocus
} from "../../redux/actions";
import {MainListItemPreview} from "./MainListItemPreview";
import {ChevronDown} from "react-feather";

const MainList = ({moviesList, nextItem}) => {
    const {mainData: movies, currentItem, movieFileFocus, movieCategoryTitle} = useSelector(state => state.mainReducer)
    let history = useHistory();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCategoryFilter())
    }, [])
    useEffect(() => {
        if (currentItem === movies.length - 1) {
            dispatch(clearCurrentItem())
        }
        onHandelSetItem(moviesList.items[0], moviesList.title, moviesList.items[0].id)
    }, [currentItem])

    const onSelectHandler = (e, path) => {
        if (e.code === "Enter") {
            history.push("/category?cid=" + path)
            onHandleClick(path)
        }
    }

    const onHandleClick = (categoryId) => {
        dispatch(setCategoryId(categoryId))
    }
    const onHandelSetItem = (item, title, id) => {
        if (id) {
            dispatch(setMovieFileFocus(item))
            dispatch(setMovieCategoryTitle(title))
        }
    }
    const onHandleInc = (e) => {
        if (currentItem <= movies.length - 1 && e.code === "ArrowDown") {
            dispatch(setCurrentItemInc())
        }
    }
    const onHandleDec = (e) => {
        if (currentItem > 0 && e.code === "ArrowUp") {
            dispatch(setCurrentItemDec())
        }
    }
    const onHandleClearItem = () => {
        dispatch(clearMovieFileFocus())
    }
    const genre = movieFileFocus && movieFileFocus.genre.map((genre, i) => {
        return (<span key={i}>
            {i !== 0 && ", "}{genre.name}
        </span>)
    })
    const country = movieFileFocus && movieFileFocus.country.map((country, i) => {
        return (<span key={i}>
            {i !== 0 && ", "}{country}
        </span>)
    })
    return (
        <div>
            <div className={css.block__column}>
                {
                    currentItem > 0 && <div className={css.arrow__up}><ChevronDown/></div>
                }
                <div className={css.arrow__down}><ChevronDown/></div>

                <ItemBase className={css.on__title__focus} onClick={() => onHandleClick(moviesList.cid)}
                          onKeyPress={(e) => onSelectHandler(e, moviesList.cid)}
                          onKeyDown={onHandleDec}>
                    <Link to={"/category?cid=" + moviesList.cid}>{moviesList.title}</Link>
                </ItemBase>

                <div className={css.row}>
                    <ItemBase>{" "}</ItemBase>
                    {moviesList.items.map((item, idx) => {
                        return (
                            <MainListItem key={idx}
                                          onFocus={() => onHandelSetItem(item, moviesList.title, item.id)}
                                          onKeyPress={(e) => onHandleInc(e)}
                                          className={css.list__item} item={item}/>
                        )
                    })}
                    <ItemBase className={css.plug}>{" "}</ItemBase>
                </div>


                {
                    movieCategoryTitle === moviesList.title && movieFileFocus &&
                    <div className={css.main__list_focus}>
                        <div className={css.focus__description}>
                            <div className={css.focus__title}>{movieFileFocus.title} <span
                                className={css.focus__genre}>({country})</span></div>
                            <div className={css.focus__genre}>
                                {movieFileFocus.year} {genre} | {!!movieFileFocus.access
                                ? <span style={{color: "#FF0000"}}>Подписка</span>
                                : <span style={{color: "#6C757D"}}>Бесплатный</span>}
                                {
                                    !!movieFileFocus.rate_age &&
                                    <span className={css.focus__rate_age}>{movieFileFocus.rate_age}</span>
                                }
                            </div>
                            <div className={css.focus__content}>{movieFileFocus.description}</div>
                        </div>
                        <div className={css.focus__rating}>
                            <div className={css.focus__rating__kp}>
                                <span
                                    className={css.focus__rate__number}>{movieFileFocus.rate_kp === 0 ? "-" : movieFileFocus.rate_kp}</span>
                                <div className={css.focus__small}>КиноПоиск</div>
                            </div>
                            <div className={css.focus__rating__imbd}>
                                <div
                                    className={css.focus__rate__number}>{movieFileFocus.rate_imdb === 0 ? "-" : movieFileFocus.rate_imdb}</div>
                                <div className={css.focus__small}>IMBb</div>
                            </div>
                        </div>
                    </div>
                }
                <ItemBase className={css.on__title__focus}
                          onClick={() => onHandleClick(nextItem.cid)}
                          onKeyPress={(e) => onSelectHandler(e, nextItem.cid)}
                          onKeyUp={onHandleInc}
                >
                    <Link className={css}
                          to={"/category?cid=" + nextItem.cid}
                    >
                        {nextItem.title}
                    </Link>
                </ItemBase>
                <div className={css.row}>
                    {nextItem.items.map((item, idx) => {
                        return (
                            <MainListItemPreview key={idx}
                                                 item={item}
                                                 className={css.list__item}
                            />
                        )
                    })}
                </div>
            </div>

        </div>

    )
}


export default MainList
