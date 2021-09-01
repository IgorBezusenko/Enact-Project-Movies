import React, {useEffect} from "react";
import css from "./Main.module.less"
import {useDispatch, useSelector} from "react-redux";
import MainList from "./MainList";
import {getMain, setError, setToken} from "../../redux/actions";
import {Header} from "../Header/Header";
import {ItemBase} from "../Buttons/ItemBase";
import {reactLocalStorage} from "reactjs-localstorage";

const MainPanel = () => {
    const movies = useSelector(state => state.mainReducer.mainData)
    const token = useSelector((state) => state.authReducer.token)
    const dispatch = useDispatch()
    // useEffect(() => {
    //     console.log("token",token)
    //     dispatch(getMain(token))
    // }, [])

    useEffect(() => {
        reactLocalStorage.set('token', token);
        dispatch(getMain(token))
        dispatch(setToken(token))
        dispatch(setError(null))
        console.log("token", token)
    }, [token]);

    return (
        <>
            <div className={css.container}>
                <Header/>
                <div className={css.content}>

                    {
                        movies.map((moviesList, idx) => {
                            return (

                                <MainList key={idx} moviesList={moviesList}/>

                            )
                        })
                    }
                </div>
            </div>
        </>

    )
}

export default MainPanel
