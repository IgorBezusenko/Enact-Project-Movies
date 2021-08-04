import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {Bookmark, Briefcase, LogIn, PlayCircle, Search, Smile, Video} from "react-feather"

import css from "./Header.module.less"
import {useDispatch, useSelector} from "react-redux";
import {clearToken, clearVideoUrl} from "../../redux/actions";
import logo from "../../assets/logo.svg"

import {reactLocalStorage} from "reactjs-localstorage";
import Spottable from "@enact/spotlight/Spottable";

export const Header = () => {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.authReducer.token)
    const [focus, setFocus] = useState(false)
    useEffect(() => {
        reactLocalStorage.set('token', token);
        console.log("token", token)
    }, [token]);


    const onClearToken = () => {
        dispatch(clearToken())
        reactLocalStorage.clear();
    }


    const onClearVideoUrl = () => {
        dispatch(clearVideoUrl())
    }
    const onHandleFocus = () => {
        setFocus(true)
    }
    const onHandleBlur = () => {
        setFocus(false)
    }

    return (
        <SidebarMini/>
    )
}


const SidebarMiniBase = ({...rest}) => {
    const [search, setSearch] = useState(false)
    const [play, setPlay] = useState(false)
    const [favorite, setFavorite] = useState(false)
    const [film, setFilm] = useState(false)
    const [serial, setSerial] = useState(false)
    const [smile, setSmile] = useState(false)
    const [login, setLogin] = useState(false)

    return (
        <div {...rest} className={css.sidebar}>
            <div className={css.logo}><NavLink to={"/main"}><img src={logo} alt={1}/></NavLink></div>

            <ul className={css.nav}>

                <li>
                    <ItemBase
                        onFocus={() => {
                            setSearch(true)
                        }}
                        onBlur={() => {
                            setSearch(false)
                        }}
                        className={css.item__base}><NavLink to={"/main"}><Search/></NavLink></ItemBase>
                    {search && <div className={css.icon__text}>Поиск</div>}
                </li>
                <li>
                    <ItemBase
                        onFocus={() => {
                            setPlay(true)
                        }}
                        onBlur={() => {
                            setPlay(false)
                        }}
                        className={css.item__base}> <NavLink to={"/main"}><PlayCircle/></NavLink></ItemBase>
                    {play && <div className={css.icon__text}>Я смотрю</div>}
                </li>
                <li>
                    <ItemBase
                        onFocus={() => {
                            setFavorite(true)
                        }}
                        onBlur={() => {
                            setFavorite(false)
                        }}
                        className={css.item__base}> <NavLink to={"/main"}><Bookmark/></NavLink></ItemBase>
                    {favorite && <div className={css.icon__text}>Избранное</div>}
                </li>
                <li>
                    <ItemBase
                        onFocus={() => {
                            setFilm(true)
                        }}
                        onBlur={() => {
                            setFilm(false)
                        }}
                        className={css.item__base}> <NavLink to={"/main"}><Video/></NavLink></ItemBase>
                    {film && <div className={css.icon__text}>Фильмы</div>}
                </li>
                <li>
                    <ItemBase
                        onFocus={() => {
                            setSerial(true)
                        }}
                        onBlur={() => {
                            setSerial(false)
                        }}
                        className={css.item__base}><NavLink to={"/main"}><Briefcase/></NavLink></ItemBase>
                    {serial && <div className={css.icon__text}>Сериалы</div>}
                </li>
                <li>
                    <ItemBase
                        onFocus={() => {
                            setSmile(true)
                        }}
                        onBlur={() => {
                            setSmile(false)
                        }}
                        className={css.item__base}> <NavLink to={"/main"}><Smile/></NavLink></ItemBase>
                    {smile && <div className={css.icon__text}>Мультфильмы</div>}
                </li>

            </ul>

            <div className={css.log__in}><ItemBase
                onFocus={() => {
                    setLogin(true)
                }}
                onBlur={() => {
                    setLogin(false)
                }}
                className={css.item__base}> <NavLink to={"/auth"}><LogIn
                style={{transform: "rotate(180deg)"}}/></NavLink></ItemBase>
                {login && <div className={css.icon__text}>Выйти</div>}
            </div>
        </div>
    )
}

const Component = ({children, ...rest}) => {
    return (<div {...rest}>{children}</div>)
}

const ItemBase = Spottable(Component)
const SidebarMini = Spottable(SidebarMiniBase)
