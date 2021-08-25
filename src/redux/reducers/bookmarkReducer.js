import {SET_BOOKMARK_ITEMS,SET_BOOKMARK_ID} from "../actions";

const initialState = {
    bookmarkItems: null,
    bookmarkId: null
}

export const bookmarkReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BOOKMARK_ITEMS :
            return {
                ...state,
                bookmarkItems: [...action.bookmarkItems]
            }
 case SET_BOOKMARK_ID :
            return {
                ...state,
                bookmarkId: action.bookmarkId
            }

        default :
            return state
    }
}

