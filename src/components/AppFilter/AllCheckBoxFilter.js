import {AppFilter} from "./AppFilter";
import css from "./AppFilter.module.less";
import {ButtonSpotTable} from "../Buttons/ButtonSpotTable";
import {Link, useHistory} from "react-router-dom";
import React from "react";
import {InputCheckBox} from "./InputCheckBox";
import {useDispatch, useSelector} from "react-redux";
import {getCategoryFilter, setFilterTypeContent, setFilterYear} from "../../redux/actions";
import {returnBackHandler, useEventListener} from "../../hooks/useEventListener";

export const AllCheckBoxFilter = ({title, itemType}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const categoryReducer = useSelector(state => state.categoryReducer)
    const {categoryFilter} = categoryReducer

    useEventListener("keydown", (e) => {
        returnBackHandler(e, onBackHandler)
    })

    const goToPath = (path) => history.push(path)
    const onBackHandler = () => goToPath("/app-filter")

    const onSelectHandler = (e, path) => {
        if (e.code === "Enter") {
            goToPath(path)
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

    const FilterCheckBox = ({itemType}) => {
        return categoryFilter && categoryFilter[`${itemType}`].map((item, index) => {
            return (
                <InputCheckBox className={css.form__control}
                               itemType={itemType}
                               inputId={item.id}
                               inputTitle={item.name}
                               inputValue={item.id}
                               inputChecked={item.checked}
                               key={item.id + item.name}
                />
            )

        })
    }

    return (
        <>
            <AppFilter title={title} onGoBack={onBackHandler}>
                <div className={css.container}>

                    <div className={css.row + " " + css.wrap}>
                        <FilterCheckBox itemType={itemType}/>

                    </div>


                    <div className={css.row}>
                        <ButtonSpotTable className={css.btn__filter}
                                         onKeyDown={(e) => onSelectHandler(e, "/app-filter")}
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
