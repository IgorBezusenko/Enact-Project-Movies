import {Link, useHistory} from "react-router-dom";
import React from "react";
import {ChevronDown} from "react-feather";
import css from "./ButtonMovie.module.less"
import {IconBase} from "./IconBase";

export const ButtonDescription = () => {
    const history = useHistory()
    const onSelect = (e) => {
        if (e.code === "Enter") {
            history.push("/description")
        }
        if (e.code === "ArrowDown") {
            history.push("/description")
        }
    }
    return (
        <>
           <div className={css.description}>
               <Link to={"/description"} >
                   <IconBase onKeyDown={(e) => onSelect(e)} className={css.on__description}>
                       <ChevronDown/>
                   </IconBase>
               </Link>
           </div>
        </>
    )
}
