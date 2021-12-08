import css from "./DemoForm.module.less"
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useHistory} from "react-router-dom";
import {NavOnBack} from "../NavOnBack/NavOnBack";
import React, {useState} from "react";
import {getToken, setError} from "../../redux/actions";
import {AppLoading} from "../AppLoading/AppLoading";
import {TextField} from "../Buttons/TextField";
import {KeyboardField} from "../Buttons/KeyboardField";
import {ArrowLeft, CornerDownLeft} from "react-feather";
import {ItemBase} from "../Buttons/ItemBase";

export const DemoForm = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {token, loading, error} = useSelector((state) => state.authReducer);

    const [login, setLogin] = useState([])
    const [isLogin, setIsLogin] = useState(true)

    const [pass, setPass] = useState([])
    const [isPass, setIsPass] = useState(false)

    const writeToField = (text) => {
        if (isLogin) {
            setLogin([...login, text])
        }
        if (isPass) {
            setPass([...pass, text])
        }
    }
    const onBackspace = () => {
        if (isLogin) {
            setLogin(login.slice(0, login.length - 1))
        }
        if (isPass) {
            setPass(pass.slice(0, pass.length - 1))
        }
    }

    const onSetFocusLogin = ()=>{
        setIsLogin(true)
        setIsPass(false)
    }
    const onSetFocusPass = ()=>{
        setIsLogin(false)
        setIsPass(true)
    }

    let loginText = login.join("")
    let passText = pass.join("")
    const onSubmit = async (e) => {
        e.preventDefault()
        dispatch(setError(null))
        if (login.length === 0) {
            dispatch(setError("Поле Логин обязательно для заполнения"))
            onSetFocusLogin()
        } else if (login.length < 6) {
            dispatch(setError("Поле Логин должно содержать не менее 6 символов"))
            onSetFocusLogin()
        } else if (pass.length === 0) {
            dispatch(setError("Поле Пароль обязательно для заполнения"))
            onSetFocusPass()
        } else if (pass.length < 6) {
            dispatch(setError("Поле Пароль должно содержать не менее 6 символов"))
            onSetFocusPass()
        } else {
            dispatch(setError(null))
            await dispatch(getToken(loginText, passText))
        }
    };

    const onGoBack = () => history.push("/auth")
    const onBackHandler = (e) => {
        if (e.code === "ArrowUp") {
            onGoBack()
        }
    }
    return (
        <>
            {token && <Redirect to={"/main"}/>}
            {loading ? <AppLoading/>
                : <div className={css.form}>
                    <div className={css.form__container}>
                        <NavOnBack className={css.on__back} title={"Вход"}
                                   onClick={onGoBack}
                                   onKeyDown={onBackHandler}
                        />
                        <div className={css.form__content}>
                            <div className={css.form__text}>
                                {error && <p className={css.form__errors}>{error}</p>}
                                <TextField className={css.form__field + ` ${isLogin && css.active}`} label={"Логин"}
                                           text={loginText}
                                           onClick={onSetFocusLogin}/>

                                <TextField className={css.form__field + ` ${isPass && css.active}`} label={"Пароль"}
                                           text={passText}
                                           onClick={onSetFocusPass}/>
                            </div>

                            <div className={css.form__keyboard}>
                                {
                                    [7, 8, 9, 4, 5, 6, 1, 2, 3].map((item, index) => {
                                        return <KeyboardField key={index} text={item} onClick={() => writeToField(item)}
                                                              className={css.form__btn}
                                        />
                                    })
                                }
                                <ItemBase onClick={onBackspace} className={css.form__btn}><ArrowLeft/> </ItemBase>
                                <KeyboardField text={"0"} onClick={() => writeToField("0")}
                                               className={css.form__btn}
                                />
                                <ItemBase onClick={onSubmit} className={css.form__btn}><CornerDownLeft/></ItemBase>
                            </div>
                        </div>

                    </div>
                </div>
            }
        </>
    );
}
