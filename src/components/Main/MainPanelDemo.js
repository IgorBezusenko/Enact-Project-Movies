import React, {useEffect} from "react";
import css from "./Main.module.less"
import {useDispatch, useSelector} from "react-redux";
import MainList from "./MainList";
import {getMain, setError, setToken} from "../../redux/actions";
import {Header} from "../Header/Header";
import {reactLocalStorage} from "reactjs-localstorage";

const MainPanel = () => {
    const movies = useSelector(state => state.mainReducer.mainData)
    const {token, connectionCode} = useSelector((state) => state.authReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        reactLocalStorage.set('token', token);
        dispatch(getMain(token, connectionCode))
        dispatch(setToken(token))
        dispatch(setError(null))
    }, [token, connectionCode]);
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
