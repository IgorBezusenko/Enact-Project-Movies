import {SET_FOCUS_REF} from "../actions";

export const ARROW_LEFT = "ArrowLeft";
export const ARROW_RIGHT = "ArrowRight";
export const ARROW_UP = "ArrowUp";
export const ARROW_DOWN = "ArrowDown";
export const ARROW_ENTER = "Enter";

const initialState = {
    focusRef: ARROW_ENTER
}

export const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FOCUS_REF:
            return {
                ...state,
                focusRef: action.focusRef
            }

        default :
            return state
    }
}

