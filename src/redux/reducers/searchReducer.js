import {
    RESET_SEARCH_PAGE,
    SET_CLEAR_SEARCH_ITEMS,
    SET_ERROR_SEARCH_ITEMS,
    SET_IS_SEARCH_MODAL,
    SET_NEW_SEARCH_PAGE,
    SET_SEARCH_ITEMS,
    SET_SEARCH_TEXT
} from "../actions";

const initialState = {
    searchItems: null,
    limitItems: 15,
    errorSearchItem: null,
    isSearchModal: false,
    searchInputText: null,

}

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_TEXT :
            return {
                ...state,
                searchInputText: action.payload
            }
        case SET_IS_SEARCH_MODAL :
            return {
                ...state,
                isSearchModal: action.payload
            }
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
        case RESET_SEARCH_PAGE :
            return {
                ...state,
                limitItems: 15
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

