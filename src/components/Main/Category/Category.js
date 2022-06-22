import React, {useEffect} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import css from "./Category.module.less"

import {useDispatch, useSelector} from "react-redux";
import {
    clearPage,
    getCategory,
    setCategoryId,
    setCurrentPath,
    setNewCategoryPage,
    setPageIncrement
} from "../../../redux/actions";
import MainListItem from "../MainListItem";
import {Header} from "../../Header/Header";
import {NavOnBack} from "../../NavOnBack/NavOnBack";
import {ButtonSpotTable} from "../../Buttons/ButtonSpotTable";
import {List, Sliders} from "react-feather";
import {Link, useHistory} from "react-router-dom";

import * as queryString from "querystring";
import {AppLoading} from "../../AppLoading/AppLoading";
import {returnBackHandler, useEventListener} from "../../../hooks/useEventListener";

export const Category = (props) => {
    const dispatch = useDispatch()
    const history = useHistory();
    const categoryReducer = useSelector(state => state.categoryReducer)
    const {categoryItems, categoryTitle, currentPage, idSort, categoryId, isFetching} = categoryReducer
    useEffect(() => {
        dispatch(clearPage())
        dispatch(getCategory(categoryId, 1, 1))
    }, [])

    useEffect(() => {
        dispatch(clearPage())
        dispatch(getCategory(categoryId, 1, 1))
    }, [categoryId])

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1))
        let actualIdSort = idSort
        if (!!parsed.id_sort) actualIdSort = parsed.id_sort
        if (!!parsed.id) dispatch(setCategoryId(parsed.id))
        dispatch(getCategory(categoryId, currentPage, actualIdSort))

    }, [categoryId, idSort])

    useEffect(() => {
        if (currentPage !== 1) {
            dispatch(setNewCategoryPage(categoryId, currentPage, idSort))
        }
    }, [currentPage, categoryId])

    useEffect(() => {
        dispatch(setCurrentPath(history.location.pathname + history.location.search))
    }, [history.location.search])

    useEventListener("keydown", (e) => {
        returnBackHandler(e, () => onBackHandler("/main"))
    })

    const onBackHandler = (path) => history.push(path)

    const onFocusHandler = (index, array) => {
        if (Math.ceil(index / 5) === Math.ceil(array.length / 5)) {
            dispatch(setPageIncrement())
        }
    }

    if (isFetching) {
        return <AppLoading/>
    }
    return (
        <>
            <div className={css.container}>
                <Header/>

                {!categoryTitle ? <AppLoading/> :
                    <>
                        <div className={css.row}>
                            <NavOnBack className={css.on__back}
                                       title={categoryTitle && categoryTitle}
                                       onClick={() => onBackHandler("/main")}
                            />
                            <div className={css.row}>
                                <Link to={"/app-sort"}>
                                    <ButtonSpotTable
                                        onClick={() => onBackHandler("/app-sort")}
                                        className={css.btn__category}>
                                        <List/>
                                        <div>Сортировка</div>
                                    </ButtonSpotTable>
                                </Link>
                                <Link to={"/app-filter"}>
                                    <ButtonSpotTable
                                        onClick={() => onBackHandler("/app-filter")}
                                        className={css.btn__category}>
                                        <Sliders/>
                                        <div>Фильтр</div>
                                    </ButtonSpotTable>
                                </Link>

                            </div>
                        </div>

                        <div className={css.list}>
                            {categoryItems && categoryItems.map((item, idx) => {
                                return (

                                    <MainListItem key={idx} className={css.list__item}
                                                  onFocus={() => onFocusHandler(idx + 1, categoryItems)}
                                                  item={item} itemIndex={idx}/>

                                )
                            })}
                        </div>
                    </>
                }
            </div>

        </>
    )
}

