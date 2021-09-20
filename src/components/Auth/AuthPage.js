import {Link, Redirect, useHistory} from "react-router-dom";
import css from "./Form.module.less";
import React, {useEffect} from "react";
import {AuthButton} from "./AuthButton";
import {Smartphone, User} from "react-feather";
import {clearToken, clearUserProfile} from "../../redux/actions";
import {reactLocalStorage} from "reactjs-localstorage";
import {useDispatch, useSelector} from "react-redux";
import {AuthAPI} from "../../API/API";

export const AuthPage = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {token} = useSelector((state) => state.authReducer)
    useEffect(async () => {
        // dispatch(clearToken())
        // dispatch(clearUserProfile())
        // reactLocalStorage.remove("token");
        // reactLocalStorage.remove("code");
        // const data = await AuthAPI.logout()
        // console.log(data)
    }, [])


    const onSelect = (e, path) => {
        if (e.code === "Enter") {
            history.push(path)
        }
    }

    return (

        <>
            {token && <Redirect to={"/main"}/>}
            <div className={css.auth__block}>
                <Link to={"/auth-form"}>
                    <AuthButton
                        className={css.auth__button}
                        onKeyPress={(e) => onSelect(e, "/auth-form")}
                        title={"Войти через логин и пароль"}>
                        <User/>
                    </AuthButton>
                </Link>

                <Link to={"/auth-mobile"}>
                    <AuthButton
                        className={css.auth__button}
                        onKeyPress={(e) => onSelect(e, "/auth-mobile")}
                        title={"Войти с помощью мобильного приложения"}>
                        <Smartphone/>
                    </AuthButton>
                </Link>
            </div>
        </>

    )
}
