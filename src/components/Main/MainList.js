import React, {useEffect} from "react";
import css from "./Main.module.less";
import MainListItem from "./MainListItem";
import {useHistory} from "react-router-dom";
import {ItemBase} from "../Buttons/ItemBase";
import {useDispatch, useSelector} from "react-redux";
import {
    clearCurrentItem, clearCurrentPath,
    getCategoryFilter,
    setCategoryId,
    setCurrentItemDec,
    setCurrentItemInc,
    setMovieCategoryTitle,
    setMovieFileFocus
} from "../../redux/actions";
import {MainListItemPreview} from "./MainListItemPreview";
import {ChevronDown, ChevronsUp} from "react-feather";
import Scroller from "@enact/sandstone/Scroller";

const MainList = ({moviesList, nextItem, moviesLength}) => {
    const {mainData: movies, currentItem, movieFileFocus, movieCategoryTitle} = useSelector(state => state.mainReducer)
    let history = useHistory();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCategoryFilter())
        dispatch(clearCurrentPath())
    }, [])

    useEffect(() => {
        // if (currentItem === movies.length - 1) {
        //     dispatch(clearCurrentItem())
        // }
        onHandelSetItem(moviesList.items[3], moviesList.title, moviesList.items[3].id)
    }, [currentItem])


    const onSelectCategory = (e, path) => {
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
    const onCurrentItemInc = () => {
        dispatch(setCurrentItemInc())
    }
    const onCurrentItemDec = () => {
        dispatch(setCurrentItemDec())
    }
    const onResetCurrentItem = () => {
        dispatch(clearCurrentItem())
    }
    const onHandleInc = (e) => {
        if (currentItem <= movies.length - 1 && e.code === "ArrowDown") {
            onCurrentItemInc()
        }
    }
    const onHandleDec = (e) => {
        if (currentItem > 0 && e.code === "ArrowUp") {
            onCurrentItemDec()
        }
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
                    currentItem > 0 &&
                    <ItemBase className={css.arrow__up}
                              onClick={onCurrentItemDec}
                              onKeyUp={onHandleDec}
                    ><ChevronDown/></ItemBase>
                }
                {
                    currentItem < moviesLength ?
                        <ItemBase className={css.arrow__down}
                                  onClick={onCurrentItemInc}
                                  onKeyUp={onHandleInc}
                        ><ChevronDown/></ItemBase>
                        :
                        <ItemBase className={css.arrow__down}
                                  onClick={onResetCurrentItem}
                        ><ChevronsUp/></ItemBase>
                }


                <div className={css.title__mainList}>
                    {moviesList.title}
                </div>


             <div className={css.row__container}>
                 <Scroller>
                     <div className={css.row}>
                         {/*<ItemBase>{" "}</ItemBase>*/}
                         {moviesList.items.map((item, idx) => {
                             return (
                                 <MainListItem
                                     itemIndex={idx}
                                     key={idx}
                                     onFocus={() => onHandelSetItem(item, moviesList.title, item.id)}

                                     className={css.list__item} item={item}/>
                             )
                         })}
                         {/*<ItemBase className={css.plug}>{" "}</ItemBase>*/}
                     </div>
                 </Scroller>
             </div>

                {
                    movieCategoryTitle === moviesList.title && movieFileFocus &&
                    <div className={css.main__list_focus}>
                        <div className={css.focus__description}>
                            <div className={css.focus__title}>{movieFileFocus.title} {!!country.length && <span
                                className={css.focus__genre}>({country})</span>}</div>
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
                {
                    nextItem && <>
                        <div className={css.title__mainList}>
                            {nextItem.title}
                        </div>
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
                    </>
                }
            </div>

        </div>

    )
}


export default MainList
