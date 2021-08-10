import React from "react";
import css from "./AppFilter.module.less"
import {AppFilter} from "./AppFilter";
import {ButtonBase} from "../Buttons/ButtonBase";
import {List} from "react-feather";
import {ItemBase} from "../Buttons/ItemBase";

export const CategorySort = (props) => {
    const onBackHandler = () => props.history.goBack()

    const onSubmitHandler = (e) => {
        e.preventDefault()
    }
    return (
        <AppFilter title={"Сортировать по"} onGoBack={onBackHandler}>

            <small className={css.sub__title}>
                выберите параметры сортировки
            </small>
            <form className={css.form} onSubmit={onSubmitHandler}>

                <div className={css.form__container}>
                    <ItemBase className={css.form__control}>
                        <input type="radio" name={"sort"} id={"popularity"}/>
                        <label htmlFor="popularity">Популярности</label>
                    </ItemBase>

                    <ItemBase className={css.form__control}>
                        <input type="radio" name={"sort"} id={"rate_kp"}/>
                        <label htmlFor="rate_kp">Рейтингу Кинопоиск</label>
                    </ItemBase>

                    <ItemBase className={css.form__control}>
                        <input type="radio" name={"sort"} id={"rate_imbd"}/>
                        <label htmlFor="rate_imbd">Рейтингу IMDB</label>
                    </ItemBase>

                    <ItemBase className={css.form__control}>
                        <input type="radio" name={"sort"} id={"year"}/>
                        <label htmlFor="year">Году</label>
                    </ItemBase>

                    <ItemBase className={css.form__control}>
                        <input type="radio" name={"sort"} id={"date_added"}/>
                        <label htmlFor="date_added">Дате добавления</label>
                    </ItemBase>
                </div>


                <div>
                    <ButtonBase className={css.btn__filter}>
                        <List/>
                        <div>Применить сортировку</div>
                    </ButtonBase>
                </div>
            </form>


        </AppFilter>
    )
}
