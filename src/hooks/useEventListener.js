import {useEffect, useRef} from "react";
import {
    HISENSE_KEYS,
    LG_KEYS,
    REMOTE_KEYS,
    SAMSUNG_KEYS,
    SOFT_ID_HISENSE,
    SOFT_ID_LG,
    SOFT_ID_SAMSUNG
} from "../API/constKey";
import {reactLocalStorage} from "reactjs-localstorage";

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

const Soft_id = reactLocalStorage.get("soft_id_portal")
export const returnBackHandler = (e, fn) => {
    e.stopPropagation()
    if (Soft_id === SOFT_ID_LG) {
        // if (e.keyCode === LG_KEYS.Back) fn();
        switch (e.keyCode) {
            case  LG_KEYS.Back:
                fn();
                break;

            default:
                break;
        }
    }
    if (Soft_id === SOFT_ID_HISENSE) {
        // if (e.keyCode === HISENSE_KEYS.Back) fn();
        switch (e.keyCode) {
            case HISENSE_KEYS.Back:
                fn();
                break;

            default:
                break;
        }
    }
    if (Soft_id === SOFT_ID_SAMSUNG) {
        // if (e.keyCode === SAMSUNG_KEYS.Back) fn();
        switch (e.keyCode) {
            case SAMSUNG_KEYS.Back:
                fn();
                break;

            default:
                break;
        }
    }

}

