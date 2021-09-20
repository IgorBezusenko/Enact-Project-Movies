import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getHistoryItems, setNewHistoryPage} from "../../redux/actions";
import css from "../Main/Category/Category.module.less";
import {Header} from "../Header/Header";
import {NavOnBack} from "../NavOnBack/NavOnBack";
import {useHistory} from "react-router-dom";
import MainListItem from "../Main/MainListItem";
import {AppLoading} from "../AppLoading/AppLoading";

export const HistoryPage = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const {historyItems, limitItems} = useSelector((state) => state.historyReducer)
    const {token} = useSelector((state) => state.authReducer)

    useEffect(() => {
        dispatch(getHistoryItems(limitItems))
    }, [])

    useEffect(() => {
        if (limitItems !== 15) {
            dispatch(getHistoryItems(limitItems))
        }
    }, [limitItems])


    const onFocusHandler = (index, array) => {
        if (Math.ceil(index / 5) === Math.ceil(array.length / 5)) {
            dispatch(setNewHistoryPage())
        }
    }

    const onGoPath = (path) => history.push(path)
    const onSelect = (e, path) => {
        if (e.code === "ArrowUp") {
            onGoPath(path)
        }
    }

    return (
        <>
            {/*{!token && <Redirect to={"/auth"}/>}*/}
            <div className={css.container}>
                <Header/>

                {!historyItems ? <AppLoading/> :
                    <>
                        <div className={css.row}>
                            <NavOnBack className={css.on__back} title={"Я смотрю"}
                                       onClick={() => onGoPath("/main")}
                                       onKeyDown={(e => onSelect(e, "/main"))}
                            />

                        </div>

                        <div className={css.list}>
                            {historyItems && historyItems.map((item, idx) => {
                                return (

                                    <MainListItem key={idx}
                                                  itemIndex={idx}
                                                  onFocus={() => onFocusHandler(idx, historyItems)}
                                                  className={css.list__item} item={item}/>

                                )
                            })}
                        </div>
                    </>
                }
            </div>

        </>
    )
}
