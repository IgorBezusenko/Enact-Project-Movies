import {PUT_LIKE_AC,SET_VOTE_AC} from "../actions";

const initialState = {
    vote: null,
    isFetching: false
}

export const likeReducer = (state = initialState, action) => {
    switch (action.type) {
        case PUT_LIKE_AC :
            return {
                ...state,
                vote: {...action.payload}
            }
            case SET_VOTE_AC :
            return {
                ...state,
                vote: {...action.payload}
            }

        default :
            return state
    }
}

