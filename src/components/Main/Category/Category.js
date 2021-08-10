import {useQuery} from "../../../utils/useQuery";
import React, {useEffect, useState} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import css from "./Category.module.less"

import {useDispatch, useSelector} from "react-redux";
import {getCategory} from "../../../redux/actions";
import MainListItem from "../MainListItem";
import {Header} from "../../Header/Header";
import {NavOnBack} from "../../NavOnBack/NavOnBack";
import {ButtonBase} from "../../Buttons/ButtonBase";
import {List, Sliders} from "react-feather";
import {AppFilter} from "../../AppFilter/CategoryFilter";
import {Link, useHistory} from "react-router-dom";


export const Category = (props) => {
    const query = useQuery();
    const categoryId = query.get("cid")
    const dispatch = useDispatch()
    const history = useHistory();
    const category = useSelector(state => state.mainReducer.category)
    const [sort, setSort] = useState(false)
    const [filter, setFilter] = useState(false)
    useEffect(() => {
        console.log("categoryId", categoryId)
        dispatch(getCategory(categoryId))
    }, [categoryId])

    useEffect(() => {
        console.log(category)
    }, [category])


    const onBackHandler = () => props.history.goBack()

    const onSelectHandler = (e, path) => {
        // console.log("item.url",item.url)
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

