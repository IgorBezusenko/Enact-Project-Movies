import React from 'react';
import Spottable from "@enact/spotlight/Spottable";

const  KeyboardFieldBase =  ({text, ...rest}) => {

    return (
        <div {...rest} >
            {text}
        </div>
    )


}

export const KeyboardField = Spottable(KeyboardFieldBase);
