import {Link, useHistory} from "react-router-dom";
import React from "react";
import {ChevronDown} from "react-feather";
import css from "./ButtonMovie.module.less"
import {IconBase} from "./IconBase";

export const ButtonDescription = () => {
    const history = useHistory()
    const onGoPath = (path) => history.push(path)
    const onSelect = (e, push) => {
        if (e.code === "ArrowDown") {
            onGoPath(push)
        }
    }
    return (
        <>
            <div className={css.description}>
                <Link to={"/description"}>
                    <IconBase onKeyDown={(e) => onSelect(e, "/description")}
                              onClick={() => onGoPath("/description")}
                              className={css.on__description}>
                        <ChevronDown/>
                    </IconBase>
                </Link>
            </div>
        </>
    )
}
