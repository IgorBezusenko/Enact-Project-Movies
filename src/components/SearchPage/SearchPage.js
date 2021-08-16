import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import MainListItem from "../Main/MainListItem";
import React, {useEffect} from "react";
import {getSearchFilter} from "../../redux/actions";
import css from "../Main/Category/Category.module.less"
import {NavOnBack} from "../NavOnBack/NavOnBack";
import {Header} from "../Header/Header";

export const SearchPage = (props) => {
    const categoryReducer = useSelector(state => state.categoryReducer)
    const dispatch = useDispatch()
    const {categoryFilter, filterTypeContent, filterYear, search} = categoryReducer

    const genre = categoryFilter.genre.filter(item => item.checked === true).map(item => item.id.toString()).join("|")
    const country = categoryFilter.country.filter(item => item.checked === true).map(item => item.id.toString()).join("|")
    console.log(genre, country, filterYear, filterTypeContent)
    useEffect(() => {
        dispatch(getSearchFilter(genre, country, filterYear, filterTypeContent))
    }, [genre, country, filterYear, filterTypeContent])

    const onNavBack = () => props.history.goBack()
    return (
        <div className={css.container}>
            <Header/>

           <div className={css.row}>
               <NavOnBack className={css.on__back} title={"Результат"} onGoBack={onNavBack}/>
           </div>
            <div className={css.list}>
                {
                    search && search.length > 0 ? search.map((item) => {
                            return <MainListItem key={item.id} className={css.list__item} item={item}/>
                        })
                        : <h1>Ничего не найденно</h1>
                }
            </div>
        </div>
    )
}
