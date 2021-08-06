import {useQuery} from "../../../utils/useQuery";
import React, {useEffect} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import css from "./Category.module.less"

import {useDispatch, useSelector} from "react-redux";
import {getCategory} from "../../../redux/actions";
import MainListItem from "../MainListItem";
import {Header} from "../../Header/Header";
import {NavOnBack} from "../../NavOnBack/NavOnBack";


export const Category = (props) => {
    const query = useQuery();
    const categoryId = query.get("cid")
    const dispatch = useDispatch()
    const category = useSelector(state => state.mainReducer.category)

    useEffect(() => {
        dispatch(getCategory(categoryId))
    }, [])

    useEffect(() => {
        console.log(category)
    }, [category])

    if (category) {
        console.log(category)
    }
    const onBackHandler = () => props.history.goBack()

    return (
        <>
            <div className={css.container}>
                <Header/>
                <NavOnBack className={css.on__back} title={category && category.title} onGoBack={onBackHandler}/>
                {/*<h3>{category && category.title}</h3>*/}
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


