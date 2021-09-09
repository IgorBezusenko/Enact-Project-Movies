import React, {useEffect, useState} from "react";
import {Link, NavLink, useHistory} from "react-router-dom";
import {Bookmark, Briefcase, LogIn, PlayCircle, Search, Smile, Video} from "react-feather"

import css from "./Header.module.less"
import {useDispatch, useSelector} from "react-redux";
import {clearVideoUrl, setCategoryId} from "../../redux/actions";

import {reactLocalStorage} from "reactjs-localstorage";
import {ItemBase} from "../Buttons/ItemBase";

export const Header = () => {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.authReducer.token)
    const history = useHistory()
    const [focus, setFocus] = useState(false)
    useEffect(() => {
        reactLocalStorage.set('token', token);
        onClearVideoUrl()
    }, []);

    const onClearVideoUrl = () => {
        dispatch(clearVideoUrl())
    }

    return (
        <Sidebar token={token}/>
    )
}

const Sidebar = ({token}) => {
    const [search, setSearch] = useState(false)
    const [play, setPlay] = useState(false)
    const [favorite, setFavorite] = useState(false)
    const [film, setFilm] = useState(false)
    const [serial, setSerial] = useState(false)
    const [smile, setSmile] = useState(false)
    const [login, setLogin] = useState(false)
    const [navbar, setNavbar] = useState(false)
    const dispatch = useDispatch()
    let history = useHistory();
    const isFocus = search || play || favorite || serial || smile || login || film || navbar
    const onSelectHandler = (e, path, cid) => {
        if (e.code === "Enter") {
            history.push(path)
            onHandleClick(cid)
        }
    }

    const onHandleClick = (categoryId) => {
        dispatch(setCategoryId(categoryId))
    }

    return (
        <div className={css.sidebar}
             onFocus={() => setNavbar(true)}
             onBlur={() => setNavbar(false)}
        >
            <div className={css.logo}><NavLink to={"/main"}>
                <img
                    src={"data:image/png;base64,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"}
                    alt={1}/></NavLink></div>

            <ul className={css.nav}>

                <li>
                    <ItemBase
                        onKeyUp={(e) => onSelectHandler(e, "/search-panel")}
                        onFocus={() => {
                            setSearch(true)
                        }}
                        onBlur={() => {
                            setSearch(false)
                        }}
                        className={css.item__base}><Link to={"/search-panel"}><Search/></Link>

                    </ItemBase>
                    {isFocus && <div className={css.icon__text + " " + `${search && css.color__red}`}>Поиск</div>}
                </li>
                <li>
                    <ItemBase onKeyUp={(e) => onSelectHandler(e, "/history")}
                              onFocus={() => {
                                  setPlay(true)
                              }}
                              onBlur={() => {
                                  setPlay(false)
                              }}
                              className={css.item__base}><Link to={"/history"}><PlayCircle/></Link></ItemBase>
                    {isFocus && <div className={css.icon__text + " " + `${play && css.color__red}`}>Я смотрю</div>}
                </li>
                <li>
                    <ItemBase onKeyUp={(e) => onSelectHandler(e, "/bookmark")}
                              onFocus={() => {
                                  setFavorite(true)
                              }}
                              onBlur={() => {
                                  setFavorite(false)
                              }}
                              className={css.item__base}><Link to={"/bookmark"}><Bookmark/></Link></ItemBase>
                    {isFocus && <div className={css.icon__text + " " + `${favorite && css.color__red}`}>Избранное</div>}
                </li>
                <li>
                    <ItemBase onClick={() => {
                        onHandleClick("100")
                    }}
                              onKeyUp={(e) => onSelectHandler(e, "category?cid=100", "100")}
                              onFocus={() => {
                                  setFilm(true)
                              }}
                              onBlur={() => {
                                  setFilm(false)
                              }}
                              className={css.item__base}><Link
                        to={"/category?cid=100"}><Video/></Link></ItemBase>
                    {isFocus && <div className={css.icon__text + " " + `${film && css.color__red}`}>Фильмы</div>}
                </li>
                <li>
                    <ItemBase onClick={() => {
                        onHandleClick("39")
                    }}
                              onKeyUp={(e) => onSelectHandler(e, "category?cid=39", "39")}
                              onFocus={() => {
                                  setSerial(true)
                              }}
                              onBlur={() => {
                                  setSerial(false)
                              }}
                              className={css.item__base}>
                        <Link to={"/category?cid=39"}>
                            <Briefcase/></Link></ItemBase>
                    {isFocus && <div className={css.icon__text + " " + `${serial && css.color__red}`}>Сериалы</div>}
                </li>
                <li>
                    <ItemBase
                        onClick={() => {
                            onHandleClick("20")
                        }}
                        onKeyUp={(e) => onSelectHandler(e, "category?cid=20", "20")}
                        onFocus={() => {
                            setSmile(true)
                        }}
                        onBlur={() => {
                            setSmile(false)
                        }}
                        className={css.item__base}><Link to={"/category?cid=20"}><Smile/></Link></ItemBase>
                    {isFocus && <div className={css.icon__text + " " + `${smile && css.color__red}`}>Мультфильмы</div>}
                </li>
                <li>
                    {
                         <div className={css.log__in}>
                            <ItemBase onKeyUp={(e) => {
                                onSelectHandler(e, "/auth")
                            }}
                                      onFocus={() => {
                                          setLogin(true)
                                      }}
                                      onBlur={() => {
                                          setLogin(false)
                                      }}
                                      className={css.item__base}>
                                <Link to={"/auth"}>
                                    <LogIn style={{transform: "rotate(180deg)"}}/>
                                </Link></ItemBase>
                            {isFocus &&
                                <div
                                className={css.icon__text + " " + `${login && css.color__red}`}>{token ? "Выйти" : "Войти"}</div>}
                        </div>
                    }
                </li>

            </ul>


        </div>
    )
}

// const Component = ({children, ...rest}) => {
//     return (<div {...rest}>{children}</div>)
// }
//
// export const ItemBase = Spottable(Component)
