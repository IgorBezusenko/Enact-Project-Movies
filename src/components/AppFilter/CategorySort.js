import React, {useEffect, useState} from "react";
import css from "./AppFilter.module.less"
import {AppFilter} from "./AppFilter";
import {ButtonBase} from "../Buttons/ButtonBase";
import {List} from "react-feather";
import {ItemBase} from "../Buttons/ItemBase";
import queryString from "querystring";
import {useDispatch, useSelector} from "react-redux";
import {setIdSort} from "../../redux/actions";
import {useHistory} from "react-router-dom";

export const CategorySort = (props) => {
    const onBackHandler = () => props.history.goBack()
    const [inputIdSort, setInputIdSort] = useState("")
    const dispatch = useDispatch()
    const history =useHistory()
    const categoryReducer = useSelector((state)=>state.categoryReducer)
    const {idSort,categoryId }  = categoryReducer

    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(setIdSort(inputIdSort))
        const query={};

        if (categoryId !== null) query.cid  = categoryId
        if (idSort !==1) query.id_sort  = idSort

        history.push({
            pathname: '/category',
            search: queryString.stringify(query)
        })

    }
    const onChangeHandler = (e) => {
        setInputIdSort(e.target.value)
        // console.log("e.target.value", e.target.value)
    }
    const onChangeKeyDown = (e) => {
        if (e.code === "Enter") {
            setInputIdSort(e.target.children[0].value)
            // console.log("e.target.value", e.target.children[0].value)
        }
    }

    return (
        <AppFilter title={"Сортировать по"} onGoBack={onBackHandler}>

            <small className={css.sub__title}>
                выберите параметры сортировки
            </small>
            <form className={css.form} onSubmit={onSubmitHandler}>

                <div className={css.form__container}>
                    <ItemBase className={css.form__control} onKeyDown={onChangeKeyDown}>
                        <input checked={false} className={inputIdSort==="3" ? css.input:""} onChange={onChangeHandler} type="radio" name={"sort"} id={"popularity"}
                               value={"3"}/>
                        <label htmlFor="popularity">Популярности</label>
                    </ItemBase>

                    <ItemBase className={css.form__control} onKeyDown={onChangeKeyDown}>
                        <input checked={false} className={inputIdSort==="4" ? css.input:""} onChange={onChangeHandler}
                               type="radio" name={"sort"} id={"rate_kp"} value={"4"}/>
                        <label htmlFor="rate_kp">Рейтингу Кинопоиск</label>
                    </ItemBase>

                    <ItemBase className={css.form__control} onKeyDown={onChangeKeyDown}>
                        <input checked={false} className={inputIdSort==="5" ? css.input:""} onChange={onChangeHandler} type="radio" name={"sort"} id={"rate_imbd"}
                               value={"5"}/>
                        <label htmlFor="rate_imbd">Рейтингу IMDB</label>
                    </ItemBase>

                    <ItemBase className={css.form__control} onKeyDown={onChangeKeyDown}>
                        <input checked={false} className={inputIdSort==="2" ? css.input:""} onChange={onChangeHandler}
                               type="radio" name={"sort"} id={"year"} value={"2"}/>
                        <label htmlFor="year">Году</label>
                    </ItemBase>

                    <ItemBase className={css.form__control} onKeyDown={onChangeKeyDown}>
                        <input checked={false} className={inputIdSort==="1" ? css.input:""} onChange={onChangeHandler} type="radio" name={"sort"} id={"date_added"}
                               value={"1"}/>
                        <label htmlFor="date_added">Дате добавления</label>
                    </ItemBase>
                </div>


                <div>
                    <ButtonBase onClick={onSubmitHandler} className={css.btn__filter}>
                        <List/>
                        <div>Применить сортировку</div>
                    </ButtonBase>
                </div>
            </form>


        </AppFilter>
    )
}
