import {AuthAPI} from "../../API/API";
import {reactLocalStorage} from "reactjs-localstorage";
import {CLEAR_ERROR, CLEAR_TOKEN, SET_ERROR, SET_TOKEN, TOGGLE_IS_FETCHING, toggleIsFetching} from "../actions";


const initialState = {
    token: reactLocalStorage.get("token") || "",
    loading: false,
    error: null
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN :
            return {
                ...state,
                // token: action.token
                token: reactLocalStorage.set('token', action.token)
            }
        case CLEAR_TOKEN :
            return {
                ...state,
                token: ""
            }
        case  TOGGLE_IS_FETCHING:
            return {
                ...state,
                loading: action.IsFetching
            }
        case  SET_ERROR:
            return {
                ...state,
                error: action.error
            }
        case  CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
