import {useEffect, useRef} from "react";

export function useEventListener(eventName, handler, element = window) {
    const savedHandler = useRef();
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);
    useEffect(() => {
            const isSupported = element && element.addEventListener;
            if (!isSupported) return;
            const eventListener = (event) => savedHandler.current(event);
            element.addEventListener(eventName, eventListener);
            return () => {
                element.removeEventListener(eventName, eventListener);
            };
        }, [eventName, element]
    );
}

export const returnBackHandler = (e, fn) => {
    e.stopPropagation()
    // if (e.keyCode === SAMSUNG_KEYS.Back) fn();
    // if (e.keyCode === LG_KEYS.Back) fn();
    // if (e.keyCode === HISENSE_KEYS.Back) fn();
}

