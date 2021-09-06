import {SET_BOOKMARK_ID, SET_BOOKMARK_ITEMS, SET_NEW_BOOKMARK_PAGE} from "../actions";

const initialState = {
    bookmarkItems: null,
    bookmarkId: null,
    limitBookmark: 15
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
        case SET_NEW_BOOKMARK_PAGE :
            return {
                ...state,
                limitBookmark: state.limitBookmark + 15
            }

        default :
            return state
    }
}

