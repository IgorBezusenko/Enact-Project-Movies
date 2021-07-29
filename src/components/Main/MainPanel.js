import React, {useEffect} from "react";
import css from "./Main.module.less"
import {useDispatch, useSelector} from "react-redux";
import MainList from "./MainList";
import {reactLocalStorage} from "reactjs-localstorage";
import {clearToken, getMain} from "../../redux/actions";
import {Header} from "../Header/Header";

const MainPanel = () => {
    const token = useSelector(state => state.authReducer.token)
    const movies = useSelector(state => state.mainReducer.mainData)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMain())
    }, [])

    useEffect(() => {
        reactLocalStorage.set('token', token);
    }, [token]);


    const onClearToken = () => {
        dispatch(clearToken())
        reactLocalStorage.clear();
    }
    return (<>

            <div className={css.movies__Container}>
                <div className={css.bgRed}>
                    <div>
                        <Header/>
                        <h1>Main Panel</h1>
                        {token ? token : "Токена нет!"}
                        <button onClick={onClearToken}>Logout</button>
                    </div>
                    {
                        movies.map((moviesList, idx) => {
                            return (
                                <div key={idx}>
                                    <MainList moviesList={moviesList}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default MainPanel
