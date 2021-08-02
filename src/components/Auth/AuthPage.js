import {Link, useHistory} from "react-router-dom";
import {NavOnBack} from "../NavOnBack/NavOnBack";
import css from "./Form.module.less";
import React from "react";
import {AuthButton} from "./AuthButton";
import {Smartphone, User} from "react-feather";

export const AuthPage = (props) => {
    const onBackHandler = () => props.history.goBack()
    const history = useHistory()

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
