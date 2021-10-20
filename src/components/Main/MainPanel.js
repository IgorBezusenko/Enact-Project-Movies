import React, {useEffect, useState} from "react";
import css from "./Main.module.less"
import {useDispatch, useSelector} from "react-redux";
import MainList from "./MainList";
import {getMain, getUserProfile, setError, setToken} from "../../redux/actions";
import {Header} from "../Header/Header";
import {reactLocalStorage} from "reactjs-localstorage";
import {Link, Redirect} from "react-router-dom";
import {AppLoading} from "../AppLoading/AppLoading";


import Button from "@enact/sandstone/Button";

const MainPanel = () => {
    const {mainData: movies, currentItem} = useSelector(state => state.mainReducer)
    const {token, connectionCode} = useSelector((state) => state.authReducer)
    const dispatch = useDispatch()
    // const [keyDown, setKeyDown] = useState("")
    // useEffect(() => {
    //     document.addEventListener("keydown", (e) => {
    //         console.log(e.type)
    //         console.log("application", platformBack)
    //         setKeyDown(`${e.keyCode} | ${e.type}`)
    //     })
    // }, [setKeyDown])

    useEffect(() => {
        reactLocalStorage.set('token', token);
        dispatch(getMain(token, connectionCode))
        dispatch(setToken(token))
        dispatch(setError(null))
        dispatch(getUserProfile())
        console.log("token", token)
    }, [token, connectionCode]);

    const list = movies.length > 0 && movies[currentItem]
    // const nextItem = movies.length > 0 && movies[currentItem + 1] || movies.length - 1 && movies[currentItem]
    const nextItem = movies.length > 0 && movies[currentItem + 1] || null
    return (
        <>
            {!token && <Redirect to={"/auth"}/>}
            <div className={css.container}>
                <Header/>
                {!list
                    ? <AppLoading/> :
                    <div className={css.content}>
                        <MainList moviesList={list} nextItem={nextItem}
                                  moviesLength={movies.length - 1}/>
                    </div>
                }
            </div>

        </>

    )
}

export default MainPanel
