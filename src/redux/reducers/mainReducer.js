import {
    CLEAR_CURRENT_ITEM, CLEAR_CURRENT_PATH,
    CLEAR_MOVIE_FILE_FOCUS,
    CLEAR_VIDEO_URL,
    GET_MAIN,
    GET_MOVIE_FILE,
    GET_VIDEO_URL,
    MAIN_TOGGLE_IS_FETCHING, SET_CURRENT_ITEM_DECREMENT, SET_CURRENT_ITEM_INCREMENT, SET_CURRENT_PATH,
    SET_MOVIE_CATEGORY_TITLE,
    SET_MOVIE_FILE_FOCUS
} from "../actions";

const initialState = {
    mainData: [],
    movieFile: {},
    videoUrl: null,
    isFetching: false,
    movieFileFocus: null,
    movieCategoryTitle: null,
    currentItem: 0,
    currentPath: null,
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
        case  CLEAR_VIDEO_URL:
            return {
                ...state,
                videoUrl: null
            }

        case  SET_MOVIE_FILE_FOCUS:
            return {
                ...state,
                movieFileFocus: {...action.item}
            }
        case   SET_MOVIE_CATEGORY_TITLE:
            return {
                ...state,
                movieCategoryTitle: action.title
            }
        case   CLEAR_MOVIE_FILE_FOCUS:
            return {
                ...state,
                movieCategoryTitle: null,
                movieFileFocus: null
            }

        case   SET_CURRENT_ITEM_INCREMENT:
            return {
                ...state,
                currentItem: state.currentItem + 1
            }
        case   SET_CURRENT_ITEM_DECREMENT:
            return {
                ...state,
                currentItem: state.currentItem - 1
            }
        case   CLEAR_CURRENT_ITEM:
            return {
                ...state,
                currentItem: 0
            }
        case   SET_CURRENT_PATH:
            return {
                ...state,
                currentPath: action.path
            }
        case   CLEAR_CURRENT_PATH:
            return {
                ...state,
                currentPath: null
            }


        default :
            return state
    }
}

