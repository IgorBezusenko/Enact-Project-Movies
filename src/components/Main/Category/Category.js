import React, {useEffect} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import css from "./Category.module.less"

import {useDispatch, useSelector} from "react-redux";
import {clearCategory, getCategory, setCategoryId, setNewCategoryPage, setPageIncrement} from "../../../redux/actions";
import MainListItem from "../MainListItem";
import {Header} from "../../Header/Header";
import {NavOnBack} from "../../NavOnBack/NavOnBack";
import {ButtonBase} from "../../Buttons/ButtonBase";
import {List, Sliders} from "react-feather";
import {Link, useHistory} from "react-router-dom";

import * as queryString from "querystring";

export const Category = (props) => {
    const dispatch = useDispatch()
    const history = useHistory();
    const categoryReducer = useSelector(state => state.categoryReducer)
    const { categoryItems, categoryTitle, currentPage, idSort, categoryId} = categoryReducer

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1))
        let actualIdSort = idSort
        if (!!parsed.id_sort) actualIdSort = parsed.id_sort
        if (!!parsed.id) dispatch(setCategoryId(parsed.id))
        dispatch(getCategory(categoryId, currentPage, actualIdSort))
        return () => {
            dispatch(clearCategory())
        }
    }, [categoryId, idSort])

    useEffect(() => {
        if (currentPage !== 1) {
            dispatch(setNewCategoryPage(categoryId, currentPage, idSort))
        }
    }, [currentPage])

    // useEffect(() => {
    //     const query = {};
    //     if (categoryId !== null) query.cid = categoryId
    //     if (idSort !== 1) query.id_sort = idSort
    //
    //     history.push({
    //         pathname: '/category',
    //         search: queryString.stringify(query)
    //     })
    // }, [idSort, categoryId])

    const onBackHandler = () => history.push("/main")

    const onSelectHandler = (e, path) => {
        if (e.code === "Enter") {
            history.push(path)
        }
    }

    const onFocusHandler = (index, array) => {
        if (Math.ceil(index / 5) === Math.ceil(array.length / 5)) {
            dispatch(setPageIncrement())
        }
    }

    return (
        <>
            <div className={css.container}>
                <Header/>

                <div className={css.row}>
                    <NavOnBack className={css.on__back} title={categoryTitle && categoryTitle}
                               onGoBack={onBackHandler}/>
                    <div className={css.row}>
                        <Link to={"/app-sort"}>
                            <ButtonBase onKeyDown={(e) => onSelectHandler(e, "/app-sort")}
                                        className={css.btn__category}>
                                <List/>
                                <div>Сортировка</div>
                            </ButtonBase>
                        </Link>
                        <Link to={"/app-filter"}>
                            <ButtonBase onKeyDown={(e) => onSelectHandler(e, "/app-filter")}
                                        className={css.btn__category}>
                                <Sliders/>
                                <div>Фильтр</div>
                            </ButtonBase>
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
            </div>

        </>
    )
}

