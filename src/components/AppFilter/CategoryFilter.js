import React, {useEffect, useState} from "react";
import {AppFilter} from "./AppFilter";
import css from "./AppFilter.module.less";
import {Sliders} from "react-feather";
import {ButtonSpotTable} from "../Buttons/ButtonSpotTable";
import {useDispatch, useSelector} from "react-redux";
import {InputCheckBox} from "./InputCheckBox";
import {InputRadio} from "./InputRadio";
import {Link, useHistory} from "react-router-dom";
import {clearPage, getCategoryFilter, setFilterTypeContent, setFilterYear} from "../../redux/actions";
import {returnBackHandler, useEventListener} from "../../hooks/useEventListener";

export const CategoryFilter = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const categoryReducer = useSelector(state => state.categoryReducer)
    const {categoryFilter, filterYear, filterTypeContent, categoryId} = categoryReducer

    useEventListener("keydown", (e) => {
        returnBackHandler(e, onBackHandler)
    })
    const onBackHandler = () => history.push(`/category?cid=${categoryId}`)
    const onSelectHandler = (e, path) => {
        if (e.code === "Enter") {
            goToPath(path)
        }
    }
    const goToPath = (path) => {
        dispatch(clearPage())
        history.push(path)
    }
    const onResetFilterClick = () => {
        dispatch(getCategoryFilter())
        dispatch(setFilterYear(""))
        dispatch(setFilterTypeContent(""))
    }
    const onResetFilterSelect = (e) => {
        if (e.code === "Enter") {
            onResetFilterClick()
        }
    }

    const FilterCheckBox = ({itemType}) => {
        return categoryFilter && categoryFilter[`${itemType}`].map((item, index) => {
            if (index < 4) {
                return <InputCheckBox className={css.form__control}
                                      itemType={itemType}
                                      inputId={item.id}
                                      inputTitle={item.name}
                                      inputValue={item.id}
                                      inputChecked={item.checked}
                                      key={item.id + item.name}
                />
            }

        })
    }
    const FilterRadio = ({itemType}) => {
        return categoryFilter && categoryFilter[`${itemType}`].map((item, index) => {
            if (index < 4) {
                return <InputRadio className={css.form__control}
                                   itemType={itemType}
                                   inputId={item.id}
                                   inputTitle={item.name}
                                   inputChecked={itemType === "year" ? filterYear : filterTypeContent}
                                   key={item.id + item.name}
                />
            }
        })
    }
    return (
        <AppFilter title={"Фильтры"} onGoBack={onBackHandler}>
            <div className={css.container}>

                <div className={css.row}>
                    <div>
                        <FilterCheckBox itemType={"genre"}/>
                        <ButtonSpotTable className={css.btn__filter + " " + css.row}
                                         onClick={() => goToPath("/all-genre")}
                                         onKeyDown={(e) => onSelectHandler(e, "/all-genre")}>
                            <div>Все жанры</div>
                            <div>{categoryFilter && categoryFilter.genre.length}</div>
                        </ButtonSpotTable>
                    </div>

                    <div>
                        <FilterCheckBox itemType={"country"}/>
                        <ButtonSpotTable className={css.btn__filter + " " + css.row}
                                         onClick={() => goToPath("/all-country")}
                                         onKeyDown={(e) => onSelectHandler(e, "/all-country")}
                        >
                            <div>Все страны</div>
                            <div>{categoryFilter && categoryFilter.country.length}</div>
                        </ButtonSpotTable>
                    </div>

                    <div>
                        <FilterRadio itemType={"year"}/>
                        <ButtonSpotTable className={css.btn__filter + " " + css.row}
                                         onClick={() => goToPath("/all-year")}
                                         onKeyDown={(e) => onSelectHandler(e, "/all-year")}
                        >
                            <div>Все годы</div>
                            <div>{categoryFilter && categoryFilter.year.length}</div>
                        </ButtonSpotTable>
                    </div>
                </div>

                <div className={css.type_content}>

                    <FilterRadio itemType={"type_content"}/>

                </div>

                <div className={css.row}>
                    <ButtonSpotTable className={css.btn__filter} onKeyDown={(e) => onSelectHandler(e, "/app-search")}>
                        <Link to={"/app-search"} className={css.btn__row}>
                            <Sliders/>
                            <div>Показать результат</div>
                        </Link>
                    </ButtonSpotTable>

                    <ButtonSpotTable className={css.btn__filter}
                                     onClick={onResetFilterClick}
                                     onKeyDown={(e) => onResetFilterSelect(e)}>
                        Сбросить фильтр
                    </ButtonSpotTable>
                </div>


            </div>

        </AppFilter>
    )
}


