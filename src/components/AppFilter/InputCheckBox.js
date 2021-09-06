import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {setFilterCountry, setFilterGenre, setFilterTypeContent} from "../../redux/actions";
import Spottable from "@enact/spotlight/Spottable";

const InputSpottable = ({itemType, inputId, inputTitle, inputValue, inputChecked, ...rest}) => {
    const dispatch = useDispatch()

    const [checked, setChecked] = useState(inputChecked)

    const onChangeHandler = (e, id, name) => {
        if (itemType === "genre") {
            dispatch(setFilterGenre(id, name, !checked))
        }
        if (itemType === "country") {
            dispatch(setFilterCountry(id, name, !checked))
        }
        if (itemType === "type_content") {
            dispatch(setFilterTypeContent(id, name, !checked))
        }

    }

    const onKeyDownHandler = (e, id, name) => {
        if (e.code === "Enter") {

            if (itemType === "genre") {
                dispatch(setFilterGenre(id, name, !checked))
            }
            if (itemType === "country") {
                dispatch(setFilterCountry(id, name, !checked))
            }

        }

    }

    return (
        <div {...rest} onKeyDown={(e) => onKeyDownHandler(e, inputId, inputTitle)}>
            <input type="checkbox"
                   id={inputId + inputTitle}
                   checked={checked}
                   name={inputId}
                   value={inputValue}
                   onChange={(e) => onChangeHandler(e, inputId, inputTitle)}
            />
            <label htmlFor={inputId + inputTitle}>{inputTitle}</label>
        </div>
    )
}
export const InputCheckBox = Spottable(InputSpottable)
