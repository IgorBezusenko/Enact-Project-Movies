import React, {useEffect} from "react";
import css from "./Main.module.less";
import MainListItem from "./MainListItem";
import {Link, useHistory} from "react-router-dom";
import {ItemBase} from "../Buttons/ItemBase";
import {useDispatch} from "react-redux";
import {getCategoryFilter, setCategoryId} from "../../redux/actions";

const MainList = ({moviesList}) => {
    let history = useHistory();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCategoryFilter())
    }, [])

    const onSelectHandler = (e, path) => {
        if (e.code === "Enter") {
            history.push("/category?cid="+path)
            onHandleClick(path)
        }
    }

    const onHandleClick = (categoryId) => {
        dispatch(setCategoryId(categoryId))
    }

    return (
        <div className={css.main__list}>

            <ItemBase className={css.on__title__focus} onClick={() => onHandleClick(moviesList.cid)}
                      onKeyDown={(e) => onSelectHandler(e,  moviesList.cid)}>
                <Link to={"/category?cid=" + moviesList.cid}><h1>{moviesList.title}</h1></Link>
            </ItemBase>

            <div className={css.row}>
                {moviesList.items.map((item, idx) => {
                    return (

                        <MainListItem key={idx} className={css.list__item} item={item}/>

                    )
                })}
            </div>


        </div>

    )
}


export default MainList
