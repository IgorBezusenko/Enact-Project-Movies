import Spottable from "@enact/spotlight/Spottable";
import React, {useEffect, useRef} from "react";
import {useHistory} from "react-router-dom";

const Component = ({children, index, ...rest}) => {
    const itemRef = useRef(null)
    const history = useHistory()
    useEffect(() => {
        if (index === 0) {
            itemRef.current.focus()

        }
    }, [history.location.pathname])
    return (<div ref={itemRef} {...rest} >{children}</div>)
}

export const ItemBaseRef = Spottable(Component)
