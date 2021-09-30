import Spottable from "@enact/spotlight/Spottable";
import React, {useEffect, useRef} from "react";
import {useSelector} from "react-redux";

const Component = ({itemFocus, children, ...rest}) => {
    const {focusRef} = useSelector(state => state.playerReducer)
    const itemRef = useRef(null)

    useEffect(() => {
        if (focusRef === itemFocus) {
            itemRef.current.focus()
        }
    }, [focusRef])

    return (<div ref={itemRef} {...rest}>{children}</div>)
}

export const ItemBaseRef = Spottable(Component)
