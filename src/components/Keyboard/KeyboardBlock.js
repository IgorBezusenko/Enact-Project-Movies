import css from "./Keyboard.module.less"
import {ArrowLeft, Globe} from "react-feather";
import React, {useState} from "react";
import {KeyBoardItem} from "./KeyboardItem";
import {ItemBase} from "../Buttons/ItemBase";
import {KeyboardField, KeyboardFieldBase} from "../Buttons/KeyboardField";


export const KeyboardBlock = ({onHiddenModal, handleSubmitForm, textField}) => {
    const [lang, setLang] = useState('ru')
    const [isUpperCase, setIsUpperCase] = useState(false)
    const [search, setSearch] = useState(textField ? textField : [])
    const [isSearch, setIsSearch] = useState(true)
    let searchText = search.join("")

    const onFocusSearch = () => {
        setIsSearch(true)
    }
    const writeToField = (text) => {
        if (isSearch && search.length < 32) {
            setSearch([...search, text])
        }
    }
    const clearToField = () => {
        if (isSearch) {
            setSearch([])
        }
    }

    const onBackspace = () => {
        if (isSearch) {
            setSearch(search.slice(0, search.length - 1))
        }
    }

    const onSubmit = () => {
        handleSubmitForm(searchText)
        onHiddenModal()
    }
    const onChangeLang = () => {
        if (lang === 'ru' || lang === 'symbol') setLang('en')
        if (lang === 'en') setLang('ru')
        if (lang === 'RU') setLang('EN')
        if (lang === 'EN') setLang('RU')
    }
    const onChangeSymbol = () => {
        setLang('symbol')
    }
    const onUpperCase = () => {
        setIsUpperCase(v => !v)
    }
    const arrKeyEnUppercase = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '_',
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '*', '=',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '?', '#', '/',
        '@', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.',
    ]
    const arrKeyEn = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '_',
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '*', '=',
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '?', '#', '/',
        '@', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.'
    ]

    const arrKeyRuUppercase = [
        'Ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-',
        'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ',
        'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', '?',
        '@', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю',]
    const arrKeyRu = [
        'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-',
        'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
        'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '?',
        '@', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю',]

    const arrKey123 = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '`', '~',
        '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_',
        '=', '+', '\\', '|', '[', ']', '{', '}', ';', ':', "'", '"',
        ',', '.', '<', '>', '/', '?', '№',
    ]

    return <>
        <div className={css.vodSearch}>
            <div className={css.vodSearch__inputContainer}>
                <KeyboardFieldBase className={css.vodSearch__field + ` ${isSearch && css.active}`}
                                   text={searchText}
                                   onClick={onFocusSearch}
                />
                <ItemBase onClick={onBackspace} className={css.vodSearch__btn}><ArrowLeft/> </ItemBase>

            </div>

            <div className={css.vodSearch__keyboardContainer}>

                <div
                    className={css.vodSearch__keyboard + ` ${lang !== 'symbol' ? css.vodSearch__width65vw : css.vodSearch__width55vw}`}>

                    {lang === 'ru' && <KeyBoardItem cssClass={css.vodSearch__num}
                                                    arrKeys={isUpperCase ? arrKeyRuUppercase : arrKeyRu}
                                                    writeToField={writeToField}/>}
                    {lang === 'en' &&
                    <KeyBoardItem isUpperCase={isUpperCase} cssClass={css.vodSearch__num}
                                  arrKeys={isUpperCase ? arrKeyEnUppercase : arrKeyEn}
                                  writeToField={writeToField}/>}
                    {lang === 'symbol' &&
                    <KeyBoardItem cssClass={css.vodSearch__num + " " + css.vodSearch__symbol} arrKeys={arrKey123}
                                  writeToField={writeToField}/>}
                    {lang !== 'symbol' && <KeyboardField text={"shift"}
                                                         onClick={() => {
                                                             onUpperCase()
                                                             console.log("shift")
                                                         }}
                                                         className={css.vodSearch__num + " " + css.vodSearch__flexGrow}/>}

                </div>
                <div className={css.vodSearch__keyboard + " " + css.vodSearch__width65vw}>
                    <ItemBase onClick={onChangeLang} className={css.vodSearch__num}><Globe/></ItemBase>
                    <KeyboardField text={"+ = [ ]"} onClick={onChangeSymbol}
                                   className={css.vodSearch__num + " " + css.vodSearch__flexGrow}/>

                    <KeyboardField text={"Пробел"} onClick={() => writeToField(" ")}
                                   className={css.vodSearch__num + " " + css.vodSearch__flexGrow}/>
                    <KeyboardField text={"Очистить"} onClick={clearToField}
                                   className={css.vodSearch__num + " " + css.vodSearch__flexGrow}/>
                    <ItemBase onClick={onSubmit}
                              className={css.vodSearch__num + " " + css.vodSearch__flexGrow}>Ввод</ItemBase>
                </div>

            </div>
            <div>


            </div>

        </div>
    </>
}
