import Popup from "@enact/sandstone/Popup";
import css from "./Keyboard.module.less"
import {ChevronLeft} from "react-feather";
import React from "react";
import {ItemBase} from "../Buttons/ItemBase";
import {KeyboardBlock} from "./KeyboardBlock";

export const KeyboardModal = ({isSearchModal, onHiddenModal, handleSubmitForm, textField}) => {


    return (
        <>
            {isSearchModal &&
            <div className={css.vodSearch__modalContainer}>
                <Popup open={isSearchModal} position={"center"} style={{zIndex: "11", background: "transparent"}}>
                    <ItemBase onClick={onHiddenModal}
                              className={css.vodGenre__modalBtn + " " + css.vodGenre__modalBack}>
                        <ChevronLeft/>
                    </ItemBase>

                    <KeyboardBlock onHiddenModal={onHiddenModal} handleSubmitForm={handleSubmitForm}
                                   textField={textField}/>

                </Popup>
            </div>
            }

        </>
    )
}
