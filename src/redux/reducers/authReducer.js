import {AuthAPI} from "../../API/API";
import {reactLocalStorage} from "reactjs-localstorage";

const SET_TOKEN = "SET_TOKEN"
const CLEAR_TOKEN = "CLEAR_TOKEN"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const SET_ERROR = "SET_ERROR"
const CLEAR_ERROR = "CLEAR_ERROR"

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

const setToken = (token) => ({
    type: SET_TOKEN,
    token
})
export const clearToken = () => ({
    type: CLEAR_TOKEN,

})
const setError = (error) => ({
    type: SET_ERROR,
    error
})
const clearError = () => ({
    type: CLEAR_ERROR,

})
const toggleIsFetching = (IsFetching) => ({
    type: TOGGLE_IS_FETCHING,
    IsFetching
})


export const getToken = (login, password) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    try {
        const {data} = await AuthAPI.login(login, password)
        dispatch(setToken(data.data.token))
        console.log("Auth", data.data.token)
        dispatch(clearError())
        dispatch(toggleIsFetching(false))
    } catch (e) {
        dispatch(setError(e.response.data.error.message))
        console.log("Error", e.response.data.error.message)
        dispatch(toggleIsFetching(false))
    }


}