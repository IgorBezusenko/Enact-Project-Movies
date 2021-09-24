import React, {useEffect, useRef, useState} from "react";
import {Header} from "../Header/Header";
import {NavOnBack} from "../NavOnBack/NavOnBack";

import css from "./SearchPanel.module.less";
import Input from '@enact/moonstone/Input';
import {ItemBase} from "../Buttons/ItemBase";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {getSearchItems, setClearSearchItems, setNewSearchPage} from "../../redux/actions";
import MainListItem from "../Main/MainListItem";

export const SearchPanel = (props) => {
    const dispatch = useDispatch()
    const history =useHistory()
    const [inputValue, setInputValue] = useState("")
    const {searchItems, limitItems} = useSelector((state) => state.searchReducer)
    const inputRef = useRef(null)

    useEffect(()=>{
        dispatch(setClearSearchItems())
        onFocusInput()
    },[])

    useEffect(() => {
        if (limitItems !== 15) {
            dispatch(getSearchItems(inputValue, limitItems))
        }
    }, [limitItems])

     const onSubmit = (e) => {
        e.preventDefault()
        dispatch(getSearchItems(inputValue, limitItems))
    }

    const onFocusInput = ()=>{
        const doc = document.querySelector('.enact_moonstone_Input_Input_input')
        doc.focus()
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

    const onFocusHandler = (index, array) => {
        if (Math.ceil(index / 5) === Math.ceil(array.length / 5)) {
            dispatch(setNewSearchPage())
        }
    }
    const onGoPath = (path) => history.push(path)
    const onSelect = (e, path) => {
        if (e.code === "ArrowUp") {
            onGoPath(path)
        }
    }
    return (
        <>
            <div className={css.container}>
                <Header/>

                <div className={css.row}>
                    <NavOnBack className={css.on__back} title={"Поиск"}
                               onClick={() => onGoPath("/main")}
                               onKeyDown={(e=>onSelect(e,"/main"))}
                    />
                </div>
                <form className={css.form} onSubmit={onSubmit}>

                    <Input ref={inputRef} className={css.formControl} type="text" autoFocus
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

                                <MainListItem key={idx}
                                              onFocus={() => onFocusHandler(idx + 1, searchItems)}
                                              className={css.list__item} item={item}/>

                            )
                        })}
                    </div>

                </div>


            </div>

        </>
    )
}
