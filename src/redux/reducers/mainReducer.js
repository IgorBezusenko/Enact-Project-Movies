import {MainAPI} from "../../API/API";

const GET_MOVIES = "GET_MOVIES";


const initialState = {
    mainData: []
}



export const mainReducer = (state=initialState, action) => {
    switch (action.type) {

        case GET_MOVIES :
            return {
                ...state,
                mainData: [...action.payload]
            }

        default :
            return state
    }
}

export const getMovies = ()=> async (dispatch)=>{
    try {
        const data = await MainAPI.main()
        const movies = data.data.filter(m=>m.viewport===0.3)

        dispatch({
            type:GET_MOVIES,
            payload: movies

        })

    }catch (e) {
        console.error(e)
    }
}