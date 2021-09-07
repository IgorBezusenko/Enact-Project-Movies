import React, {useEffect} from "react";
import css from "./Main.module.less";
import MainListItem from "./MainListItem";
import {Link, useHistory} from "react-router-dom";
import {ItemBase} from "../Buttons/ItemBase";
import {useDispatch, useSelector} from "react-redux";
import {
    clearMovieFileFocus,
    getCategoryFilter,
    setCategoryId,
    setMovieCategoryTitle,
    setMovieFileFocus
} from "../../redux/actions";

const MainList = ({moviesList}) => {
    const {movieFileFocus, movieCategoryTitle} = useSelector(state => state.mainReducer)
    let history = useHistory();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCategoryFilter())
    }, [])

    const onSelectHandler = (e, path) => {
        if (e.code === "Enter") {
            history.push("/category?cid=" + path)
            onHandleClick(path)
        }
    }

    const onHandleClick = (categoryId) => {
        dispatch(setCategoryId(categoryId))
    }
    const onHandelSetItem = (item, title) => {
        console.log("item", title, item)
        dispatch(setMovieFileFocus(item))
        dispatch(setMovieCategoryTitle(title))
    }
    const onHandleClearItem = () => {
        dispatch(clearMovieFileFocus())
    }
    const genre = movieFileFocus && movieFileFocus.genre.map((genre, i) => {
        return (<span key={i}>
            {i !== 0 && ", "}{genre.name}
        </span>)
    })
    // console.log(moviesList.items)
    return (
        <div className={css.main__list}>

            <ItemBase className={css.on__title__focus} onClick={() => onHandleClick(moviesList.cid)}
                      onKeyPress={(e) => onSelectHandler(e, moviesList.cid)}>
                <Link to={"/category?cid=" + moviesList.cid}><h1>{moviesList.title}</h1></Link>
            </ItemBase>

            <div className={css.row}>
                <ItemBase>{" "}</ItemBase>
                {moviesList.items.map((item, idx) => {
                    return (
                        <MainListItem key={idx}
                                      onFocus={() => onHandelSetItem(item, moviesList.title)}
                                      // onBlur={onHandleClearItem}
                                      className={css.list__item} item={item}/>
                    )
                })}
            </div>

            {movieCategoryTitle === moviesList.title && movieFileFocus &&
            <div className={css.main__list_focus}>
                <div className={css.focus__description}>
                    <div className={css.focus__title}>{movieFileFocus.title}</div>
                    <div className={css.focus__genre}>
                        {movieFileFocus.year} {genre} | {!!movieFileFocus.access
                        ? <span style={{color: "#FF0000"}}>Подписка</span>
                        : <span style={{color: "#6C757D"}}>Бесплатный</span>}
                        {
                            !!movieFileFocus.rate_age &&
                            <span className={css.focus__rate_age}>{movieFileFocus.rate_age}</span>
                        }
                    </div>
                    <div>{movieFileFocus.description}</div>
                </div>
                <div className={css.focus__rating}>
                    <div className={css.focus__rating__kp}>
                        <div>{movieFileFocus.rate_kp}</div>
                        <div className={css.focus__small}>КиноПоиск</div>
                    </div>
                    <div className={css.focus__rating__imbd}>
                        <div>{movieFileFocus.rate_imdb}</div>
                        <div className={css.focus__small}>IMBb</div>
                    </div>
                </div>
            </div>
            }


        </div>

    )
}


export default MainList
