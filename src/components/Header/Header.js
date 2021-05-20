import React from "react";
import {NavLink} from "react-router-dom";
import {Home, LogIn} from "react-feather"

import css from "./Header.module.less"

export const Header = () => {
    return (
        <div>
            <ul className={css.nav}>
                <li><NavLink to={"/"}><Home/>Home Page</NavLink></li>
                <li><NavLink to={"/auth"}><LogIn/>Login</NavLink></li>
            </ul>
        </div>
    )
}
