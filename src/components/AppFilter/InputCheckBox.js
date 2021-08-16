import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {setFilterCountry, setFilterGenre, setFilterTypeContent} from "../../redux/actions";
import Spottable from "@enact/spotlight/Spottable";

const InputSpottable = ({itemType, inputId, inputTitle, inputValue, inputChecked, ...rest}) => {
    const dispatch = useDispatch()

    const [checked, setChecked] = useState(inputChecked)

    const onChangeHandler = (e, id, name) => {
        // console.log(checked, id, itemType)
        // console.log(e.target.value)
        if (itemType === "genre") {
            dispatch(setFilterGenre(id, name, !checked))
            console.log("genre", id, name, !checked)
        }
        if (itemType === "country") {
            console.log("country", id, name, !checked)
            dispatch(setFilterCountry(id, name, !checked))
        }
        if (itemType === "type_content") {
            console.log("type_content", id, name, !checked)
            dispatch(setFilterTypeContent(id, name, !checked))
        }

    }

    const onKeyDownHandler = (e, id, name) => {
        if (e.code === "Enter") {

            if (itemType === "genre") {
                console.log("genre", id, name, checked)
                dispatch(setFilterGenre(id, name, !checked))
            }
            if (itemType === "country") {
                console.log("country", id, name, !checked)
                dispatch(setFilterCountry(id, name, !checked))
            }
            // if (itemType === "type_content") {
            //     console.log("type_content", id, name, !checked)
            //     dispatch(setFilterTypeContent(id, name, !checked))
            // }
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
