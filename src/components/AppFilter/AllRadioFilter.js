import {AppFilter} from "./AppFilter";
import css from "./AppFilter.module.less";
import {ButtonBase} from "../Buttons/ButtonBase";
import {Link, useHistory} from "react-router-dom";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCategoryFilter, setFilterTypeContent, setFilterYear} from "../../redux/actions";
import {InputRadio} from "./InputRadio";

export const AllRadioFilter = ({title, itemType}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const categoryReducer = useSelector(state => state.categoryReducer)
    const {categoryFilter, filterYear, filterTypeContent} = categoryReducer

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
                        <ButtonBase className={css.btn__filter}
                                    onKeyDown={(e) => onSelectHandler(e, "/app-filter")}
                        >
                            <Link to={"/app-filter"} className={css.btn__row}>
                                <div>Применить</div>
                            </Link>
                        </ButtonBase>

                        <ButtonBase className={css.btn__filter}
                                    onClick={onResetFilterClick}
                                    onKeyDown={(e) => onResetFilterSelect(e)}
                        >
                            Сбросить фильтр
                        </ButtonBase>
                    </div>


                </div>

            </AppFilter>
        </>
    )
}
