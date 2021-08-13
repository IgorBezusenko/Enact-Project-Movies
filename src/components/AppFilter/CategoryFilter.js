import React, {useEffect, useState} from "react";
import {AppFilter} from "./AppFilter";
import css from "./AppFilter.module.less";
import {Sliders} from "react-feather";
import {ButtonBase} from "../Buttons/ButtonBase";
import {useDispatch, useSelector} from "react-redux";
import {getCategoryFilter, setFilterCountry, setFilterGenre, setFilterTypeContent} from "../../redux/actions";
import Spottable from "@enact/spotlight/Spottable";
import {log} from "@enact/core/handle";

export const CategoryFilter = (props) => {
    const onBackHandler = () => props.history.goBack()
    const dispatch = useDispatch()
    const categoryFilter = useSelector(state => state.categoryReducer.categoryFilter)



    const FilterBase = ({itemType}) => {

        return categoryFilter && categoryFilter[`${itemType}`].map((item, index) => {
            if (index < 4 ) {
                return <InputBase className={css.form__control}
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
    return (
        <AppFilter title={"Фильтры"} onGoBack={onBackHandler}>
            <div className={css.container}>

                <div className={css.row}>
                    <div>
                        <FilterBase itemType={"genre"}/>
                        <ButtonBase className={css.btn__filter + " " + css.row}>
                            <div>Все жанры</div>
                            <div>{categoryFilter && categoryFilter.genre.length}</div>
                        </ButtonBase>
                    </div>

                    <div>
                        <FilterBase itemType={"country"}/>
                        <ButtonBase className={css.btn__filter + " " + css.row}>
                            <div>Все страны</div>
                            <div>{categoryFilter && categoryFilter.country.length}</div>
                        </ButtonBase>
                    </div>

                    <div>
                        <FilterBase itemType={"year"}/>
                        <ButtonBase className={css.btn__filter + " " + css.row}>
                            <div>Все годы</div>
                            <div>{categoryFilter && categoryFilter.year.length}</div>
                        </ButtonBase>
                    </div>
                </div>

                <div className={css.type_content}>

                    <FilterBase itemType={"type_content"}/>

                </div>

                <div className={css.row}>
                    <ButtonBase className={css.btn__filter}>
                        <Sliders/>
                        <div>Показать результат</div>
                    </ButtonBase>

                    <ButtonBase className={css.btn__filter}>
                        Сбросить фильтр
                    </ButtonBase>
                </div>


            </div>

        </AppFilter>
    )
}

const InputSpottable = ({itemType, inputId, inputTitle, inputValue,inputChecked, ...rest}) => {
    const dispatch= useDispatch()

    const [checked, setChecked] = useState(inputChecked)

    const onChangeHandler = (e, id, name) => {
        // console.log(checked, id, itemType)
        // console.log(e.target.value)
        if (itemType === "genre") {
            console.log("genre", id, name, !checked)
            dispatch(setFilterGenre(id, name, !checked))
        }
        if (itemType==="country"){
            console.log("country",id, name, !checked)
            dispatch(setFilterCountry(id, name, !checked))
        }

        if (itemType==="type_content"){
            console.log("type_content",id, name, !checked)
            dispatch(setFilterTypeContent(id, name, !checked))
        }
        // if (itemType==="year"){
        //     console.log("year",checked)
        //     dispatch(setFilterYear(checked))
        // }

    }

    const onKeyDownHandler = (e, id, name) => {
        if (e.code === "Enter") {

            if (itemType === "genre") {
                console.log("genre", id, name, checked)
                dispatch(setFilterGenre(id, name, !checked))
            }
            if (itemType==="country"){
                console.log("country",id, name, !checked)
                dispatch(setFilterCountry(id, name, !checked))
            }
            if (itemType==="type_content"){
                console.log("type_content",id, name, !checked)
                dispatch(setFilterTypeContent(id, name, !checked))
            }
        }

    }

    return (
        <div {...rest} onKeyDown={(e) => onKeyDownHandler(e, inputId, inputTitle)}>
            <input type="checkbox" id={inputId + inputTitle} checked={checked} name={inputId} value={inputValue}
                // onKeyDown={(e) => onKeyDownHandler(e, inputId)}
                   onChange={(e) => onChangeHandler(e, inputId, inputTitle)}
            />
            <label htmlFor={inputId + inputTitle}>{inputTitle}</label>
        </div>
    )
}
const InputBase = Spottable(InputSpottable)
