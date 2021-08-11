import {GET_CATEGORY, SET_CATEGORY_ID, SET_ID_SORT} from "../actions";

const initialState = {
    category:null,
    categoryId:null,
    currentPage:1,
    idSort:1,
    isFetching: false
}

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {

            case  GET_CATEGORY:
            return {
                ...state,
                category: action.payload
            }
        case SET_CATEGORY_ID:
            return {
                ...state,
                categoryId: action.categoryId
            }
        case SET_ID_SORT:
            return {
                ...state,
                idSort: action.idSort
            }


        default :
            return state
    }
}

