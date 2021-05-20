import {AuthAPI, MainAPI} from "../API/API";

export const AUTH_TOGGLE_IS_FETCHING = "AUTH/AUTH_TOGGLE_IS_FETCHING"
export const SET_TOKEN = "AUTH/SET_TOKEN"
export const CLEAR_TOKEN = "AUTH/CLEAR_TOKEN"
export const SET_ERROR = "AUTH/SET_ERROR"
export const CLEAR_ERROR = "AUTH/CLEAR_ERROR"

export const GET_MAIN = "MAIN/GET_MAIN";
export const GET_MOVIE_FILE = "MAIN/GET_MOVIE_FILE";
export const MAIN_TOGGLE_IS_FETCHING = "MAIN/MAIN_TOGGLE_IS_FETCHING"


export const authToggleIsFetching = (IsFetching) => ({
    type: AUTH_TOGGLE_IS_FETCHING,
    IsFetching
})
export const setToken = (token) => ({
    type: SET_TOKEN,
    token
})
export const clearToken = () => ({
    type: CLEAR_TOKEN,

})
export const setError = (error) => ({
    type: SET_ERROR,
    error
})
export const clearError = () => ({
    type: CLEAR_ERROR,

})

export const getToken = (login, password) => async (dispatch) => {
    dispatch(authToggleIsFetching(true))
    try {
        const {data} = await AuthAPI.login(login, password)
        dispatch(setToken(data.data.token))
        console.log("Auth", data.data.token)
        dispatch(clearError())
        dispatch(authToggleIsFetching(false))
    } catch (e) {
        dispatch(setError(e.response.data.error.message))
        console.log("Error", e.response.data.error.message)
        dispatch(authToggleIsFetching(false))
    }
}


export const mainToggleIsFetching = (IsFetching) => ({
    type: MAIN_TOGGLE_IS_FETCHING,
    IsFetching
})



export const getMain = () => async (dispatch) => {
    dispatch(mainToggleIsFetching(true))
    try {
        const {data} = await MainAPI.main()
        const movies = data.filter(m => m.viewport === 0.3)
        dispatch(mainToggleIsFetching(false))
        dispatch({
            type: GET_MAIN,
            payload: movies
        })

    } catch (e) {
        console.log("Error", e.response.data.message)
        dispatch(mainToggleIsFetching(false))
    }
}




export const getMovieFile = (id) => async (dispatch) => {
    dispatch(mainToggleIsFetching(true))
    try {
        const {data} = await MainAPI.movieFile(id)
        dispatch(mainToggleIsFetching(false))
        dispatch({
            type: GET_MOVIE_FILE,
            payload: data
        })

    } catch (e) {
        console.log("Error", e.response.data.message)
        dispatch(mainToggleIsFetching(false))

    }
}