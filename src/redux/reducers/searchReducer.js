import {SET_CLEAR_SEARCH_ITEMS, SET_SEARCH_ITEMS} from "../actions";

const initialState = {
    searchItems: null
}

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_ITEMS :
            return {
                ...state,
                searchItems: [...action.searchItems]
            }
            case SET_CLEAR_SEARCH_ITEMS :
            return {
                ...state,
                searchItems: null
            }
        default :
            return state
    }
}

