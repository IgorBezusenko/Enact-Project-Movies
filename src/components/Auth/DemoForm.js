import css from "./DemoForm.module.less"
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useHistory} from "react-router-dom";
import {NavOnBack} from "../NavOnBack/NavOnBack";
import React, {useState} from "react";
import {getToken, setError, setLogin, setPassword, toggleAuthModal} from "../../redux/actions";
import {AppLoading} from "../AppLoading/AppLoading";
import {TextField} from "../Buttons/TextField";
import {ItemBase} from "../Buttons/ItemBase";
import {KeyboardModal} from "../Keyboard/KeyboardModal";
import {Lock, Mail} from "react-feather";
import {stringSplit} from "../../utils/stringSplit";

export const DemoForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {token, loading, error, isAuthModal, login, password} = useSelector((state) => state.authReducer);
    const [textField, setTextField] = useState([])
    const [isLogin, setIsLogin] = useState(true)
    const [isPass, setIsPass] = useState(false)

    const onSetFocusLogin = () => {
        setIsLogin(true)
        setIsPass(false)
        onShowModal()
        setTextField(stringSplit(login))
    }
    const onSetFocusPass = () => {
        setIsLogin(false)
        setIsPass(true)
        onShowModal()
        setTextField(stringSplit(password))
    }
    const onShowModal = () => dispatch(toggleAuthModal(true))
    const onHiddenModal = () => dispatch(toggleAuthModal(false))

    const handleSubmitForm = (text) => {
        if (isLogin) {
            dispatch(setLogin(text))
        }
        if (isPass) {
            dispatch(setPassword(text))
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        dispatch(setError(null))
        if (!login) {
            dispatch(setError("Поле Логин обязательно для заполнения"))
        } else if (login && login.length < 6) {
            dispatch(setError("Поле Логин должно содержать не менее 6 символов"))
        } else if (!password) {
            isPass && dispatch(setError("Поле Пароль обязательно для заполнения"))
        } else if (password && password.length < 6) {
            dispatch(setError("Поле Пароль должно содержать не менее 6 символов"))
        } else {
            dispatch(setError(null))
            await dispatch(getToken(login, password))
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
            {loading && <AppLoading/>}
            <KeyboardModal isSearchModal={isAuthModal}
                           textField={textField}
                           onHiddenModal={onHiddenModal}
                           handleSubmitForm={handleSubmitForm}
            />
            <div className={css.on__backContainer}>
                <NavOnBack className={css.on__back} title={"Вход"}
                           onClick={onGoBack}
                           onKeyDown={onBackHandler}
                />
            </div>
            <div className={css.form}>

                <div className={css.form__container}>

                    <div className={css.form__content}>
                        <div className={css.form__text}>
                            {error && <p className={css.form__errors}>{error}</p>}
                            <TextField className={css.form__field + ` ${isLogin && css.active}`}
                                       label={<Mail/>}
                                       text={login ? login : "email / логин"}
                                       isFocus={isLogin}
                                       onClick={onSetFocusLogin}/>

                            <TextField className={css.form__field + ` ${isPass && css.active}`}
                                       label={<Lock/>}
                                       text={password ? password : "Пароль"}
                                       isFocus={isPass}
                                       onClick={onSetFocusPass}/>
                        </div>

                        <div>
                            <ItemBase onClick={onSubmit} className={css.form__btn}>Войти</ItemBase>
                        </div>

                    </div>

                </div>
            </div>

        </>
    );
}
