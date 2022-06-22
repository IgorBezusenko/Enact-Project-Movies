import {AppFilter} from "./AppFilter";
import css from "./AppFilter.module.less";
import {ButtonSpotTable} from "../Buttons/ButtonSpotTable";
import {Link, useHistory} from "react-router-dom";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCategoryFilter, setFilterTypeContent, setFilterYear} from "../../redux/actions";
import {InputRadio} from "./InputRadio";
import {returnBackHandler, useEventListener} from "../../hooks/useEventListener";

export const AllRadioFilter = ({title, itemType}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const categoryReducer = useSelector(state => state.categoryReducer)
    const {categoryFilter, filterYear, filterTypeContent} = categoryReducer

    useEventListener("keydown", (e) => {
        returnBackHandler(e, onBackHandler)
    })

    const onBackHandler = () => history.push("/app-filter")

    const onSelectHandler = (e) => {
        if (e.code === "Enter") {
            onBackHandler()
        }
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

    const FilterRadio = ({itemType}) => {
        return categoryFilter && categoryFilter[`${itemType}`].map((item, index) => {
            return <InputRadio className={css.form__control}
                               itemType={itemType}
                               inputId={item.id}
                               inputTitle={item.name}
                               inputChecked={itemType === "year" ? filterYear : filterTypeContent}
                               key={item.id + item.name}
            />
        })
    }

    return (
        <>
            <AppFilter title={title} onGoBack={onBackHandler}>
                <div className={css.container}>

                    <div className={css.row + " " + css.wrap}>
                        <FilterRadio itemType={itemType}/>

                    </div>


                    <div className={css.row}>
                        <ButtonSpotTable className={css.btn__filter}
                                         onKeyDown={onSelectHandler}
                        >
                            <Link to={"/app-filter"} className={css.btn__row}>
                                <div>Применить</div>
                            </Link>
                        </ButtonSpotTable>

                        <ButtonSpotTable className={css.btn__filter}
                                         onClick={onResetFilterClick}
                                         onKeyDown={(e) => onResetFilterSelect(e)}
                        >
                            Сбросить фильтр
                        </ButtonSpotTable>
                    </div>


                </div>

            </AppFilter>
        </>
    )
}
