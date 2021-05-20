import {GET_MAIN, GET_MOVIE_FILE, MAIN_TOGGLE_IS_FETCHING} from "../actions";

const initialState = {
    mainData: [],
    movieFile: {},
    isFetching: false
}

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MAIN :
            return {
                ...state,
                mainData: [...action.payload]
            }
        case GET_MOVIE_FILE :
            return {
                ...state,
                movieFile: {...action.payload}
            }

        case  MAIN_TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.IsFetching
            }

        default :
            return state
    }
}

