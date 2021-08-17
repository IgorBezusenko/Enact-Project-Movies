import React, {useEffect} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import css from "./Category.module.less"

import {useDispatch, useSelector} from "react-redux";
import {getCategory, getCategoryFilter} from "../../../redux/actions";
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
    const {category, currentPage, idSort, categoryId} = categoryReducer


    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1))
        let actualCurrentPage = currentPage
        let actualIdSort = idSort
        if (!!parsed.page) actualCurrentPage = +parsed.page
        if (!!parsed.id_sort) actualIdSort = parsed.id_sort

        dispatch(getCategory(categoryId, actualCurrentPage, actualIdSort))
    }, [categoryId])

    useEffect(() => {
        const query = {};
        if (categoryId !== null) query.cid = categoryId
        if (idSort !== 1) query.id_sort = idSort

        history.push({
            pathname: '/category',
            search: queryString.stringify(query)
        })
    }, [idSort, categoryId])


    const onBackHandler = () => history.push("/main")

    const onSelectHandler = (e, path) => {
        if (e.code === "Enter") {
            history.push(path)
        }

    }


    return (
        <>
            <div className={css.container}>
                <Header/>

                <div className={css.row}>
                    <NavOnBack className={css.on__back} title={category && category.title} onGoBack={onBackHandler}/>
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
                    {category && category.items.map((item, idx) => {
                        return (

                            <MainListItem key={idx} className={css.list__item} item={item}/>

                        )
                    })}
                </div>
            </div>

        </>
    )
}

