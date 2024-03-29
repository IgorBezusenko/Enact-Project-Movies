import React, {useEffect, useState} from "react";
import {Header} from "../Header/Header";
import {NavOnBack} from "../NavOnBack/NavOnBack";

import css from "./SearchPanel.module.less";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {
    getSearchItems,
    resetSearchPage,
    setClearSearchItems,
    setNewSearchPage,
    setSearchText,
    toggleSearchModal
} from "../../redux/actions";
import MainListItem from "../Main/MainListItem";
import {KeyboardModal} from "../Keyboard/KeyboardModal";
import {ItemBase} from "../Buttons/ItemBase";
import {X} from "react-feather";
import {ItemBaseRef} from "../Buttons/ItemBaseRef";
import {stringSplit} from "../../utils/stringSplit";
import {returnBackHandler, useEventListener} from "../../hooks/useEventListener";

export const SearchPanel = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {
        searchItems,
        limitItems,
        errorSearchItem,
        isSearchModal,
        searchInputText
    } = useSelector((state) => state.searchReducer)
    const [textField, setTextField] = useState([])

    useEffect(() => {

        // onFocusInput()
        return () => {
            dispatch(setClearSearchItems())
            dispatch(resetSearchPage())
            dispatch(setSearchText(null))
        }
    }, [])

    useEffect(() => {
        if (limitItems !== 15 && searchInputText !== null) {
            onSubmitSearch()
        }
    }, [limitItems])

    useEffect(() => {
        onSubmitSearch()
    }, [searchInputText])


    useEventListener("keydown", (e) => {
        // console.log({isSearchModal})
        if (isSearchModal === false) {
            returnBackHandler(e, () => onGoPath("/main"))
        }
    })


    const onHiddenModal = () => dispatch(toggleSearchModal(false))
    const onShowModal = () => {
        dispatch(toggleSearchModal(true))
        setTextField(stringSplit(searchInputText))
    }

    const onSubmitSearch = () => dispatch(getSearchItems(searchInputText, limitItems))
    const handleSubmitForm = (searchText) => dispatch(setSearchText(searchText))

    const onResetInputValue = () => {
        dispatch(setSearchText(null))
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
            <KeyboardModal isSearchModal={isSearchModal}
                           onHiddenModal={onHiddenModal}
                           handleSubmitForm={handleSubmitForm}
                           textField={textField}
            />
            <div className={css.container}>
                <Header/>

                <div className={css.row}>
                    <NavOnBack className={css.on__back} title={"Поиск"}
                               onClick={() => onGoPath("/main")}
                               onKeyDown={(e => onSelect(e, "/main"))}
                    />
                </div>

                {/*<form className={css.form} onSubmit={onSubmit}>*/}
                {/*    <div className={css.error}>*/}
                {/*        {errorSearchItem && errorSearchItem}*/}
                {/*    </div>*/}
                {/*    <Input ref={inputRef} className={css.formControl} type="text" autoFocus*/}
                {/*           placeholder={"Введите поисковый запрос"}*/}
                {/*           value={inputValue}*/}
                {/*           onChange={onChangeInputValue}*/}
                {/*    />*/}
                {/*    <ItemBase className={css.on__close}*/}
                {/*              onClick={onResetInputValue}*/}
                {/*              onKeyDown={onSelectHandler}*/}
                {/*    ><span></span></ItemBase>*/}
                {/*</form>*/}

                <div className={css.content}>
                    <div className={css.error}>
                        {errorSearchItem && errorSearchItem}
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <ItemBaseRef className={css.textField} onClick={onShowModal}
                                     index={0}>
                            {searchInputText ? searchInputText : "Введите поисковый запрос"}
                        </ItemBaseRef>
                        <ItemBase className={css.textField__reset}
                                  onClick={onResetInputValue}
                                  onKeyDown={onSelectHandler}
                        ><X/></ItemBase>
                    </div>
                    {searchItems && searchItems.length !== 0 && <h2>Результат поиска</h2>}

                    <div className={css.list}>
                        {
                            searchItems && searchItems.length === 0 && searchInputText !== null &&
                            <h1>Ничего не найдено...</h1>
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
