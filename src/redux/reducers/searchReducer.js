import {SET_CLEAR_SEARCH_ITEMS, SET_ERROR_SEARCH_ITEMS, SET_NEW_SEARCH_PAGE, SET_SEARCH_ITEMS} from "../actions";

const initialState = {
    searchItems: null,
    limitItems: 15,
    errorSearchItem:null
}

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_ITEMS :
            return {
                ...state,
                searchItems: [...action.searchItems]
            }
        case SET_NEW_SEARCH_PAGE :
            return {
                ...state,
                limitItems: state.limitItems + 15
            }
        case SET_CLEAR_SEARCH_ITEMS :
            return {
                ...state,
                searchItems: null
            }
        case SET_ERROR_SEARCH_ITEMS :
            return {
                ...state,
                errorSearchItem: action.error
            }
        default :
            return state
    }
}

