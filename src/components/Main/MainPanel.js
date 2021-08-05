import React, {useEffect} from "react";
import css from "./Main.module.less"
import {useDispatch, useSelector} from "react-redux";
import MainList from "./MainList";
import {getMain} from "../../redux/actions";
import {Header} from "../Header/Header";

const MainPanel = () => {
    const movies = useSelector(state => state.mainReducer.mainData)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMain())
    }, [])


    return (
        <>
            <div className={css.container}>
                <Header/>
                <div className={css.content}>{
                    movies.map((moviesList, idx) => {
                        return (

                                <MainList key={idx} moviesList={moviesList}/>

                        )
                    })
                }</div>
            </div>
        </>

    )
}

export default MainPanel
