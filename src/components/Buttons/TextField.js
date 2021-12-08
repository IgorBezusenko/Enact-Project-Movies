import React from 'react';
import Spottable from "@enact/spotlight/Spottable";

const TextFieldBase = ({text, label, ...rest}) => {


    return (
        <div {...rest} >
            <div>{label}</div>
            <span>{text}</span>
        </div>
    )


}

export const TextField = Spottable(TextFieldBase);
