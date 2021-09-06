import {Link, useHistory} from "react-router-dom";
import {NavOnBack} from "../NavOnBack/NavOnBack";
import css from "./Form.module.less";
import React, {useEffect} from "react";
import {AuthButton} from "./AuthButton";
import {Smartphone, User} from "react-feather";
import {clearToken} from "../../redux/actions";
import {reactLocalStorage} from "reactjs-localstorage";
import {useDispatch} from "react-redux";

export const AuthPage = (props) => {
    const onBackHandler = () => props.history.goBack()
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearToken())
        reactLocalStorage.remove("token");
    }, [])


    const onSelect = (e, path) => {
        if (e.code === "Enter") {
            history.push(path)
        }
    }

    return (

        <div className={css.container}>
            <div><NavOnBack className={css.on__back} title={"Вход"} onGoBack={onBackHandler}/></div>
            <div className={css.auth__block}>
                <Link to={"/auth-form"}>
                    <AuthButton
                        className={css.auth__button}
                        onKeyDown={(e) => onSelect(e, "/auth-form")}
                        title={"Войти через логин и пароль"}>
                        <User/>
                    </AuthButton>
                </Link>

                <Link to={"/auth-mobile"}>
                    <AuthButton
                        className={css.auth__button}
                        onKeyDown={(e) => onSelect(e, "/auth-mobile")}
                        title={"Войти с помощью мобильного приложения"}>
                        <Smartphone/>
                    </AuthButton>
                </Link>
            </div>
        </div>

    )
}
