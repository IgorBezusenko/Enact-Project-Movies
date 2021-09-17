import css from "./Form.module.less"
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useHistory} from "react-router-dom";
import {NavOnBack} from "../NavOnBack/NavOnBack";
import React, {useState} from "react";
import Input from "@enact/moonstone/Input";
import {getToken, setError} from "../../redux/actions";
import {reactLocalStorage} from "reactjs-localstorage";

export const AuthForm = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [login, setLogin] = useState("")
    const [pass, setPass] = useState("")


    const authReducer = useSelector((state) => state.authReducer);
    const {token, loading, error} = authReducer

    const onBackHandler = () => history.push("/auth")
    // const onGoBack = (e)=>{
    //     if (e.code==="Enter"){
    //         onGoBack()
    //     }
    // }
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
    console.log("token-45",token)
    return (
        <>
            {!!token && <Redirect to={"/main"}/>}
            {loading ? <p>Lading...</p> : <div className={css.container}>
                <NavOnBack className={css.on__back} title={"Вход"} onGoBack={onBackHandler}/>
                <form className={css.form} onSubmit={onSubmit}>


                    {error && <p className={css.errors}>{error}</p>}
                    <div className={css.formControl}>
                        <Input onChange={(e) => {
                            setLogin(e.value.trim())
                        }}      autoFocus
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

                    <button className={css.btn}>Войти</button>
                </form>
            </div>
            }
        </>
    );
}
