import {reactLocalStorage} from "reactjs-localstorage";
import {
    AUTH_TOGGLE_IS_FETCHING,
    CLEAR_ERROR,
    CLEAR_TOKEN, CLEAR_USER_PROFILE,
    SET_CONNECTION_CODE,
    SET_ERROR,
    SET_TOKEN,
    SET_TOKEN_CODE, SET_USER_PROFILE
} from "../actions";


const initialState = {
    token: reactLocalStorage.get("token") || "",
    loading: false,
    error: null,
    tokenCode: null,
    connectionCode: reactLocalStorage.get('code') || "",
    userProfile: null
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN_CODE :
            return {
                ...state,
                tokenCode: action.tokenCode
            }
        case SET_CONNECTION_CODE :
            return {
                ...state,
                connectionCode: action.connectionCode,
                // connectionCode: reactLocalStorage.set('code',action.connectionCode)
            }
        case SET_TOKEN :
            return {
                ...state,
                token: action.token
                // token: reactLocalStorage.set('token', action.token)
            }
        case CLEAR_TOKEN :
            return {
                ...state,
                token: ""
            }
        case  AUTH_TOGGLE_IS_FETCHING:
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
            case  SET_USER_PROFILE:
            return {
                ...state,
                userProfile: {...action.userProfile}
            }
            case  CLEAR_USER_PROFILE:
            return {
                ...state,
                userProfile: null
            }
        default:
            return state
    }
}
