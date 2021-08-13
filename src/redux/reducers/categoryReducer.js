import {
    GET_CATEGORY,
    SET_CATEGORY_FILTER,
    SET_CATEGORY_ID,
    SET_FILTER_COUNTRY,
    SET_FILTER_GENRE, SET_FILTER_TYPE_CONTENT,
    SET_ID_SORT
} from "../actions";


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
        case SET_CATEGORY_FILTER:
            return {
                ...state,
                categoryFilter: action.categoryFilter
            }

        // case EDIT_ITEM:
        //     const indexEdit = state.filterGenre.findIndex(
        //         (item) => item.id === action.payloadId
        //     );
        //     const editItem = {
        //         id: action.payloadId,
        //         date: today,
        //         ...action.payloadItem,
        //     };
        //     return {
        //         ...state,
        //         itemState: [
        //             ...state.itemState.slice(0, indexEdit),
        //             editItem,
        //             ...state.itemState.slice(indexEdit + 1),
        //         ],
        //     };

        case SET_FILTER_GENRE: {
            const indexGenre = state.categoryFilter.genre.findIndex(
                (item) => item.id === action.id
            );
            const editItem = {
                id: action.id,
                name: action.name,
                checked: action.checked,
            };
            return {
                ...state,
                categoryFilter: {
                    ...state.categoryFilter,
                    genre: [
                        ...state.categoryFilter.genre.slice(0, indexGenre),
                        editItem,
                        ...state.categoryFilter.genre.slice(indexGenre + 1),
                    ]
                }
            }
        }
        // case SET_FILTER_YEAR:

        case SET_FILTER_COUNTRY: {
            const indexCountry = state.categoryFilter.country.findIndex(
                (item) => item.id === action.id
            );
            const editItem = {
                id: action.id,
                name: action.name,
                checked: action.checked,
            };
            return {
                ...state,
                categoryFilter: {
                    ...state.categoryFilter,
                    country: [
                        ...state.categoryFilter.country.slice(0, indexCountry),
                        editItem,
                        ...state.categoryFilter.country.slice(indexCountry + 1),
                    ]
                }
            }
        }
        case SET_FILTER_TYPE_CONTENT:
        {
            const indexTypeContent = state.categoryFilter.type_content.findIndex(
                (item) => item.id === action.id
            );
            const editItem = {
                id: action.id,
                name: action.name,
                checked: action.checked,
            };
            return {
                ...state,
                categoryFilter: {
                    ...state.categoryFilter,
                    type_content: [
                        ...state.categoryFilter.type_content.slice(0, indexTypeContent),
                        editItem,
                        ...state.categoryFilter.type_content.slice(indexTypeContent + 1),
                    ]
                }
            }
        }



        default :
            return state
    }
}

const initialState = {
    category: null,
    categoryId: null,
    categoryFilter: {
        genre: [],
        country: [],
        year: [],
        type_content: [],
        category: [],
        sort: []
    },

    currentPage: 1,
    idSort: 1,
    isFetching: false
}
