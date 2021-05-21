import {GET_MAIN, GET_MOVIE_FILE, GET_VIDEO_URL, MAIN_TOGGLE_IS_FETCHING} from "../actions";

const initialState = {
    mainData: [],
    movieFile: {},
    videoUrl:null,
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
        case  GET_VIDEO_URL:
            return {
                ...state,
                videoUrl: action.videoUrl
            }

        default :
            return state
    }
}

