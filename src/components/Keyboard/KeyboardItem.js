import React from "react";
import {KeyboardField} from "../Buttons/KeyboardField";


export const KeyBoardItem = ({arrKeys, writeToField, cssClass}) => {
    return arrKeys.map((item, index) => {
        return <KeyboardField key={index} text={item} onClick={() => writeToField(item)}
                              className={cssClass}
        />
    })
}
