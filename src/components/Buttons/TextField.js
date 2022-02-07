import React, {useEffect, useRef} from 'react';
import Spottable from "@enact/spotlight/Spottable";

export const TextFieldBase = ({text, label, isFocus, ...rest}) => {
    const focusRef = useRef(null)
    useEffect(() => {
        if (isFocus) {
            focusRef.current.focus()
        }
    })

    return (
        <div ref={focusRef} {...rest} >
            <span>{label}</span>
            {text}
        </div>
    )


}

export const TextField = Spottable(TextFieldBase);
