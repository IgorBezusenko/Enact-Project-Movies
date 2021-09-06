import {SET_HISTORY_ITEMS, SET_NEW_HISTORY_PAGE} from "../actions";

const initialState = {
    historyItems: null,
    limitItems: 15
}

export const historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HISTORY_ITEMS :
            return {
                ...state,
                historyItems: [...action.historyItems]
            }
        case SET_NEW_HISTORY_PAGE :
            return {
                ...state,
                limitItems: state.limitItems + 15
            }

        default :
            return state
    }
}

