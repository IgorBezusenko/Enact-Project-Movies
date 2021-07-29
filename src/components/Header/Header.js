import React, {useEffect} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {Home, LogIn} from "react-feather"

import css from "./Header.module.less"
import {useDispatch} from "react-redux";
import {clearVideoUrl} from "../../redux/actions";

export const Header = () => {
    const dispatch=useDispatch()


    const onClearVideoUrl=()=>{
        dispatch(clearVideoUrl())
    }
    return (
        <div>
            <ul className={css.nav}>
                <li onClick={onClearVideoUrl}><NavLink to={"/"}><Home/>Home Page</NavLink></li>
                <li><NavLink to={"/auth"}><LogIn/>Login</NavLink></li>
            </ul>
        </div>
    )
}
