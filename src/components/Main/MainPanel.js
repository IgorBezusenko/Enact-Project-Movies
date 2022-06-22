import React, {useEffect} from "react";
import css from "./Main.module.less"
import {useDispatch, useSelector} from "react-redux";
import MainList from "./MainList";
import {getMain, getUserProfile, setError, setToken} from "../../redux/actions";
import {Header} from "../Header/Header";
import {reactLocalStorage} from "reactjs-localstorage";
import {Redirect, useHistory} from "react-router-dom";
import {AppLoading} from "../AppLoading/AppLoading";
import {returnBackHandler, useEventListener} from "../../hooks/useEventListener";

const MainPanel = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {mainData: movies, currentItem} = useSelector(state => state.mainReducer)
    const {token, connectionCode} = useSelector((state) => state.authReducer)


    useEffect(() => {
        reactLocalStorage.set('token', token);
        dispatch(setError(null))
        if (token) {
            dispatch(getMain(token, connectionCode))
            dispatch(setToken(token))

            dispatch(getUserProfile())
        }
    }, [token, connectionCode]);

    const onGoPath = () => history.push("/*")

    useEventListener("keydown", (e) => {
        returnBackHandler(e, onGoPath)
    })

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
