import {
    CLEAR_CATEGORY,
    GET_CATEGORY,
    SET_CATEGORY_FILTER,
    SET_CATEGORY_ID,
    SET_FILTER_COUNTRY,
    SET_FILTER_GENRE,
    SET_FILTER_SEARCH,
    SET_FILTER_TYPE_CONTENT,
    SET_FILTER_YEAR,
    SET_ID_SORT,
    SET_NEW_CATEGORY_PAGE, SET_NEW_FILTER_SEARCH_PAGE,
    SET_NEW_SEARCH_PAGE,
    SET_PAGE_INCREMENT
} from "../actions";

const initialState = {
    search: [],
    categoryItems: [],
    categoryTitle: null,
    categoryId: null,
    categoryFilter: {
        genre: [],
        country: [],
        year: [],
        type_content: [],
        category: [],
        sort: []
    },
    filterYear: "",
    filterTypeContent: "",
    currentPage: 1,
    idSort: 1,
    isFetching: false
}


export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case  GET_CATEGORY:
            return {
                ...state,
                categoryTitle: action.payload.title,
                categoryItems: [...action.payload.items],
            }
        case  SET_NEW_CATEGORY_PAGE:
            return {
                ...state,
                categoryItems: [...state.categoryItems, ...action.payload.items]
            }
        case  CLEAR_CATEGORY:
            return {
                ...state,
                categoryItems: [],
                categoryTitle: null,
                categoryId: null,
                search: [],
                currentPage: 1
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

        case SET_FILTER_YEAR:
            return {
                ...state,
                filterYear: action.filterYear
            }
        case SET_FILTER_TYPE_CONTENT:
            return {
                ...state,
                filterTypeContent: action.filterTypeContent
            }

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
        case SET_FILTER_SEARCH:
            return {
                ...state,
                search: action.search
            }
        case  SET_NEW_FILTER_SEARCH_PAGE:
            return {
                ...state,
                search: [...state.search, ...action.search]
            }

        case SET_PAGE_INCREMENT:
            return {
                ...state,
                currentPage: state.currentPage + 1
            }

        default :
            return state
    }
}

