import Spottable from "@enact/spotlight/Spottable";
import React from "react";
import {setFilterTypeContent, setFilterYear} from "../../redux/actions";
import {useDispatch} from "react-redux";

const InputSpottable = ({inputId, inputTitle, itemType, inputChecked, ...rest}) => {
    const dispatch = useDispatch()
    const onChangeHandler = (id) => {
        if (itemType === "year") {
            console.log("year", id)

            dispatch(setFilterYear(id))
        }
        if (itemType === "type_content") {
            console.log("type_content", id)

            dispatch(setFilterTypeContent(id))
        }

    }
    const onKeyDownHandler = (e, id) => {
        if (e.code === "Enter") {
            if (itemType === "year") {
                console.log("year", id)
                dispatch(setFilterYear(id))
            }
            if (itemType === "type_content") {
                console.log("type_content", id)
                dispatch(setFilterTypeContent(id))
            }
        }
    }
    return (
        <div {...rest} onKeyDown={(e) => onKeyDownHandler(e, inputId)}>
            <input type="radio"
                   id={inputId + inputTitle}
                   checked={inputChecked === inputId && `${inputChecked}`}
                   name={itemType}
                   value={inputId}
                   onChange={() => onChangeHandler(inputId)}
            />
            <label htmlFor={inputId + inputTitle}>{inputTitle}</label>
        </div>
    )
}
export const InputRadio = Spottable(InputSpottable)
