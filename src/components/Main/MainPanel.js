import React, {useEffect} from "react";
import css from "./Main.module.less"
import {useDispatch, useSelector} from "react-redux";
import MainList from "./MainList";
import {getMain, getUserProfile, setError, setToken} from "../../redux/actions";
import {Header} from "../Header/Header";
import {reactLocalStorage} from "reactjs-localstorage";
import {Redirect} from "react-router-dom";
import {AppLoading} from "../AppLoading/AppLoading";

const MainPanel = () => {
    const {mainData: movies, currentItem} = useSelector(state => state.mainReducer)
    const {token, connectionCode} = useSelector((state) => state.authReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        reactLocalStorage.set('token', token);
        dispatch(getMain(token, connectionCode))
        dispatch(setToken(token))
        dispatch(setError(null))
        dispatch(getUserProfile())
        console.log("token",token)
    }, [token, connectionCode]);

    const list = movies.length > 0 && movies[currentItem]
    const list1 = movies.length > 0 && movies[currentItem + 1] || movies.length - 1 && movies[currentItem]
    return (
        <>
            {!token && <Redirect to={"/auth"}/>}
            <div className={css.container}>
                <Header/>
                {!list
                    ? <AppLoading/> :
                    <div className={css.content}>
                        <MainList moviesList={list} nextItem={list1}/>
                    </div>
                }
            </div>

        </>

    )
}

export default MainPanel
