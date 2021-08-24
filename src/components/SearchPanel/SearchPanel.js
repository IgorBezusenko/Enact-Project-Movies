import React, {useState} from "react";
import {Header} from "../Header/Header";
import {NavOnBack} from "../NavOnBack/NavOnBack";

import css from "./SearchPanel.module.less";
import Input from '@enact/moonstone/Input';
import {ItemBase} from "../Buttons/ItemBase";
import {useDispatch, useSelector} from "react-redux";
import {getSearchItems, setClearSearchItems} from "../../redux/actions";
import MainListItem from "../Main/MainListItem";

export const SearchPanel = (props) => {
    const [inputValue, setInputValue] = useState("")
    const searchItems = useSelector((state) => state.searchReducer.searchItems)
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(getSearchItems(inputValue))
    }

    const onChangeInputValue = (e) => {
        setInputValue(e.value)
    }
    const onResetInputValue = () => {
        setInputValue("")
        dispatch(setClearSearchItems())
    }
    const onSelectHandler = (e) => {
        if (e.code === "Enter") {
            onResetInputValue()
        }
    }
    return (
        <>
            <div className={css.container}>
                <Header/>

                <div className={css.row}>
                    <NavOnBack className={css.on__back} title={"Поиск"} onGoBack={() => props.history.push("/main")}/>
                </div>
                <form className={css.form} onSubmit={onSubmit}>

                    <Input className={css.formControl} type="text" autoFocus
                           placeholder={"Введите поисковый запрос"}
                           value={inputValue}
                           onChange={onChangeInputValue}
                    />
                    <ItemBase className={css.on__close}
                              onClick={onResetInputValue}
                              onKeyDown={onSelectHandler}
                    ><span></span></ItemBase>

                </form>
                <div className={css.content}>
                    <h2>Результат поиска</h2>

                    <div className={css.list}>
                        {
                            searchItems && searchItems.length === 0 && <h1>Ничего не найденно...</h1>
                        }
                        {searchItems && searchItems.map((item, idx) => {
                            return (

                                <MainListItem key={idx} className={css.list__item} item={item}/>

                            )
                        })}
                    </div>

                </div>


            </div>

        </>
    )
}
