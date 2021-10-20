import css from "./Form.module.less"
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useHistory} from "react-router-dom";
import {NavOnBack} from "../NavOnBack/NavOnBack";
import React, {useState} from "react";
import Input from "@enact/moonstone/Input";
import {getToken, setError} from "../../redux/actions";
import {AppLoading} from "../AppLoading/AppLoading";
import {ButtonSpotTable} from "../Buttons/ButtonSpotTable";

export const AuthForm = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [login, setLogin] = useState("")
    const [pass, setPass] = useState("")


    const authReducer = useSelector((state) => state.authReducer);
    const {token, loading, error} = authReducer

    const onSubmit = async (e) => {
        e.preventDefault()
        dispatch(setError(null))
        if (login === "") {
            dispatch(setError("Поле Логин обязательно для заполнения"))

        } else if (pass === "") {
            dispatch(setError("Поле Пароль обязательно для заполнения"))

        } else if (login.length < 6) {
            dispatch(setError("Поле Логин должно содержать не менее 6 символов"))

        } else if (pass.length < 6) {
            dispatch(setError("Поле Пароль должно содержать не менее 6 символов"))

        } else {
            dispatch(setError(null))
            await dispatch(getToken(login, pass))
        }
    };

    const onGoBack = () => history.push("/auth")
    const onBackHandler = (e) => {
        if (e.code === "ArrowUp") {
            onGoBack()
        }
    }
    console.log("token-45", token)
    return (
        <>
            {token && <Redirect to={"/main"}/>}
            {loading ? <AppLoading/>
                : <div className={css.container}>
                    <NavOnBack className={css.on__back} title={"Вход"}
                               onClick={onGoBack}
                               onKeyDown={onBackHandler}
                    />
                    <form className={css.form} onSubmit={onSubmit}>


                        {error && <p className={css.errors}>{error}</p>}
                        <div className={css.formControl}>
                            <Input onChange={(e) => {
                                setLogin(e.value.trim())
                            }} autoFocus
                                // className={css.input}
                                   value={login}
                                   placeholder={"email / логин"}
                            />
                        </div>

                        <div className={css.formControl}>
                            <Input onChange={(e) => {
                                setPass(e.value)
                            }}
                                   autoFocus
                                // className={css.input}
                                   value={pass} placeholder={"Пароль"}
                                   type={"password"}
                            />
                        </div>

                        <ButtonSpotTable onClick={onSubmit} className={css.btn}>Войти</ButtonSpotTable>
                    </form>
                </div>
            }
        </>
    );
}
