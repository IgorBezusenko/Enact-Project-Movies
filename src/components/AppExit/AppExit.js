import Button from "@enact/sandstone/Button";
import {platformBack} from '@enact/webos/application';
import {useHistory} from "react-router-dom";

import css from "./AppExit.module.less"
import {ButtonSpotTable} from "../Buttons/ButtonSpotTable";

export const AppExit = () => {
    const history = useHistory()
    const onGoMain = () => {
        history.push("/main")
    }
    return (
        <>
            <div className={css.blockOut}>
                <div>
                    <h1>Выйти из приложения?</h1>
                </div>
                <div className={css.blockOut__btn}>
                    <ButtonSpotTable className={css.btn + " " + css.btn__enter} onClick={onGoMain}>Остаться</ButtonSpotTable>
                    <ButtonSpotTable className={css.btn + " " + css.btn__exit} onClick={platformBack}>Выход</ButtonSpotTable>
                </div>
            </div>
        </>
    )
}
