import {SET_HISTORY_ITEMS} from "../actions";

const initialState = {
   historyItems: null
}

export const historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HISTORY_ITEMS :
                return {
                    ...state,
                    historyItems: [...action.historyItems]
                }

        default :
            return state
    }
}

