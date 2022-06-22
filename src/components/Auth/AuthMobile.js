import css from "./Form.module.less"
import {NavOnBack} from "../NavOnBack/NavOnBack";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTokenCode, setConnectionCode, setTokenCode} from "../../redux/actions";
import {Redirect, useHistory} from "react-router-dom";
import {returnBackHandler, useEventListener} from "../../hooks/useEventListener";
import {reactLocalStorage} from "reactjs-localstorage";
import {SOFT_ID} from "../../API/constKey";

export const AuthMobile = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {connectionCode, token, tokenCode} = useSelector(state => state.authReducer)
    let deviseUID = reactLocalStorage.get("portal_deviseUID")

    useEffect(() => {
        dispatch(setTokenCode(null))
        if (!deviseUID) {
            const currentTime = Date.now().toString()
            reactLocalStorage.set("portal_deviseUID", SOFT_ID + currentTime)
            dispatch(setConnectionCode(currentTime))
        }
        if (deviseUID) {
            dispatch(setConnectionCode(deviseUID))
        }

        // dispatch(setConnectionCode("info.modelName"))
    }, [history.location.pathname])

    useEffect(() => {
        // console.log("18con", connectionCode)
        const interval = setInterval(() => {
            dispatch(getTokenCode(connectionCode, token))
        }, 3000)

        return () => {
            clearInterval(interval)
        }
    }, [connectionCode])

    useEventListener("keydown", (e) => {
        returnBackHandler(e, onGoBack)
    })

    const onGoBack = () => history.push("/auth")
    const onBackHandler = (e) => {
        if (e.code === "ArrowUp") {
            onGoBack()
        }
    }
    return (
        <>
            {token && <Redirect to={"/main"}/>}
            <div className={css.container}>
                <NavOnBack className={css.on__back} title={"Вход"}
                           onClick={onGoBack}
                           onKeyDown={onBackHandler}
                />
                <h3 className={css.authMobile__title}>Для подключения телевизора к вашему профилю PORTAL всего 3
                    шага:</h3>
                <div className={css.authMobile__content}>
                    <ul className={css.authMobile__list}>
                        <li className={css.list__item}>
                            <div className={css.index}>1</div>
                            <div>Войдите в профиль приложения на смартфоне или на сайте <span
                                className={css.color__red}>portal.idc.md/manage-profile</span>
                            </div>
                        </li>
                        <li className={css.list__item}>
                            <div className={css.index}>2</div>
                            <div>В разделе “Подключить устройство” введите код <span
                                className={css.color__red}>
                                {
                                    tokenCode && tokenCode
                                }
                            </span></div>
                        </li>
                        <li className={css.list__item}>
                            <div className={css.index}>3</div>
                            <div>Дождитесь подключения телевизора к профилю</div>
                        </li>
                    </ul>
                    <div className={css.authMobile__tab}>
                        <div className={css.code}>
                            {
                                tokenCode && tokenCode
                            }
                        </div>
                        <div>Код подключения</div>
                    </div>
                </div>

            </div>
        </>
    )
}
