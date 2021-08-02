import css from "./Form.module.less"
import {NavOnBack} from "../NavOnBack/NavOnBack";

export const AuthMobile = (props) => {
    const onBackHandler = () => props.history.goBack()
    let code = "785479"
    return (
        <>
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
                                className={css.color__red}>{code}</span></div>
                        </li>
                        <li className={css.list__item}>
                            <div className={css.index}>3</div>
                            <div>Дождитесь подключения телевизора к профилю</div>
                        </li>
                    </ul>
                    <div className={css.authMobile__tab}>
                        <div className={css.code}>{code}</div>
                        <div>Код подключения</div>
                    </div>
                </div>

            </div>
        </>
    )
}
