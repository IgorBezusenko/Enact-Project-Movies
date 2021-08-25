import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getHistoryItems} from "../../redux/actions";
import css from "../Main/Category/Category.module.less";
import {Header} from "../Header/Header";
import {NavOnBack} from "../NavOnBack/NavOnBack";
import {useHistory} from "react-router-dom";
import MainListItem from "../Main/MainListItem";

export const HistoryPage = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const historyItems = useSelector((state) => state.historyReducer.historyItems)

    useEffect(() => {
        dispatch(getHistoryItems())
    }, [])


    const onBackHandler = (path) => history.push(path)


    return (
        <>
            <div className={css.container}>
                <Header/>

                <div className={css.row}>
                    <NavOnBack className={css.on__back} title={"Я смотрю"} onGoBack={() => onBackHandler("/main")}/>

                </div>

                <div className={css.list}>
                    {historyItems && historyItems.map((item, idx) => {
                        return (

                            <MainListItem key={idx} className={css.list__item} item={item}/>

                        )
                    })}
                </div>
            </div>

        </>
    )
}
