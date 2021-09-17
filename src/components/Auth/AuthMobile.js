import css from "./Form.module.less"
import {NavOnBack} from "../NavOnBack/NavOnBack";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTokenCode, setConnectionCode} from "../../redux/actions";
import {Redirect} from "react-router-dom";

export const AuthMobile = (props) => {
    const dispatch = useDispatch()
    const {connectionCode, token, tokenCode} = useSelector(state => state.authReducer)
    useEffect(() => {
        dispatch(setConnectionCode("info.modelName"))
    }, [])

    useEffect(() => {
        console.log("18con", connectionCode)
        const interval = setInterval(() => {
            dispatch(getTokenCode(connectionCode, token))
        }, 3000)

        return () => {
            clearInterval(interval)
        }
    }, [connectionCode])

    const onBackHandler = () => props.history.goBack()
    return (
        <>
            {!!token && <Redirect to={"/main"}/>}
            <div className={css.container}>
                <NavOnBack className={css.on__back} title={"Вход"} onGoBack={onBackHandler}/>
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
