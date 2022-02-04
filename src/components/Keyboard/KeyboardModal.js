import Popup from "@enact/sandstone/Popup";
import css from "./Keyboard.module.less"
import {useDispatch, useSelector} from "react-redux";
import {ChevronLeft} from "react-feather";
import React from "react";
// import {KeyboardBlock} from "./KeyboardBlock";
import {ItemBase} from "../Buttons/ItemBase";
import {toggleSearchModal} from "../../redux/actions";
import {KeyboardBlock} from "./KeyboardBlock";

export const KeyboardModal = ({isSearchModal, onHiddenModal}) => {



    return (
        <>
            {isSearchModal &&
            <div className={css.vodSearch__modalContainer}>
                <Popup open={isSearchModal} position={"center"} style={{zIndex: "11", background: "transparent"}}>
                    <ItemBase onClick={onHiddenModal}
                              className={css.vodGenre__modalBtn + " " + css.vodGenre__modalBack}>
                        <ChevronLeft/> {"Поиск"}
                    </ItemBase>

                    <KeyboardBlock onHiddenModal={onHiddenModal}/>

                </Popup>
            </div>
            }

        </>
    )
}
