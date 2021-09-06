import {AuthAPI, MainAPI, MoviesPreview} from "../API/API";

export const AUTH_TOGGLE_IS_FETCHING = "AUTH/AUTH_TOGGLE_IS_FETCHING"
export const SET_TOKEN = "AUTH/SET_TOKEN"
export const CLEAR_TOKEN = "AUTH/CLEAR_TOKEN"
export const SET_ERROR = "AUTH/SET_ERROR"
export const CLEAR_ERROR = "AUTH/CLEAR_ERROR"

export const GET_MAIN = "MAIN/GET_MAIN";
export const GET_MOVIE_FILE = "MAIN/GET_MOVIE_FILE";
export const MAIN_TOGGLE_IS_FETCHING = "MAIN/MAIN_TOGGLE_IS_FETCHING"
export const GET_VIDEO_URL = "MAIN/GET_VIDEO_URL"
export const CLEAR_VIDEO_URL = "MAIN/CLEAR_VIDEO_URL"

export const PUT_LIKE_AC = "MoviesPreview/PUT_LIKE_AC"
export const SET_VOTE_AC = "MoviesPreview/SET_VOTE_AC"

export const GET_CATEGORY = "CATEGORY/GET_CATEGORY"
export const SET_NEW_CATEGORY_PAGE = "CATEGORY/SET_NEW_CATEGORY_PAGE"
export const SET_PAGE_INCREMENT = "CATEGORY/SET_PAGE_INCREMENT"
export const CLEAR_CATEGORY = "CATEGORY/CLEAR_CATEGORY"
export const SET_CATEGORY_ID = "CATEGORY/SET_CATEGORY_ID"
export const SET_ID_SORT = "CATEGORY/SET_ID_SORT"
export const SET_CATEGORY_FILTER = "CATEGORY/SET_CATEGORY_FILTER"
export const SET_FILTER_GENRE = "CATEGORY/SET_FILTER_GENRE"
export const SET_FILTER_YEAR = "CATEGORY/SET_FILTER_YEAR"
export const SET_FILTER_COUNTRY = "CATEGORY/SET_FILTER_COUNTRY"
export const SET_FILTER_TYPE_CONTENT = "CATEGORY/SET_FILTER_TYPE_CONTENT"
export const SET_FILTER_SEARCH = "CATEGORY/SET_FILTER_SEARCH"

export const SET_SEARCH_ITEMS = "SEARCH/SET_SEARCH_ITEMS"
export const SET_NEW_SEARCH_PAGE = "SEARCH/SET_NEW_SEARCH_PAGE"
export const SET_CLEAR_SEARCH_ITEMS = "SEARCH/SET_CLEAR_SEARCH_ITEMS"

export const SET_HISTORY_ITEMS = "HistoryPage/SET_HISTORY_ITEMS"
export const SET_NEW_HISTORY_PAGE = "HistoryPage/SET_NEW_HISTORY_PAGE"

export const SET_BOOKMARK_ITEMS = "BookMark/SET_BOOKMARK_ITEMS"
export const SET_BOOKMARK_ID = "BookMark/SET_BOOKMARK_ID"


// export const SET_FILTER_SEARCH = "CATEGORY/SET_FILTER_SEARCH"


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
        // reactLocalStorage.set('token', (data.data.token))
        console.log("Auth", data.data.token)
        dispatch(clearError())
        dispatch(authToggleIsFetching(false))
    } catch (e) {
        dispatch(setError(e.response.data.error.message))
        console.log("Error getToken", e.response.data.error.message)
        dispatch(authToggleIsFetching(false))
    }
}


export const mainToggleIsFetching = (IsFetching) => ({
    type: MAIN_TOGGLE_IS_FETCHING,
    IsFetching
})

export const getMain = (token) => async (dispatch) => {
    dispatch(mainToggleIsFetching(true))
    try {
        // await AuthAPI.setAuthToken(token)
        const {data} = await MainAPI.main(token)
        const movies = data.filter(m => m.viewport === 0.3)
        dispatch(mainToggleIsFetching(false))
        dispatch({
            type: GET_MAIN,
            payload: movies
        })

    } catch (e) {
        console.log("Error getMain", e.response)
        dispatch(mainToggleIsFetching(false))
    }
}

export const getMovieFile = (id) => async (dispatch) => {
    dispatch(mainToggleIsFetching(true))
    try {
        const {data} = await MainAPI.movieFile(id)

        dispatch({
            type: GET_MOVIE_FILE,
            payload: data
        })
        dispatch(mainToggleIsFetching(false))
    } catch (e) {
        console.log("Error getMovieFile", e.response)
        dispatch(mainToggleIsFetching(false))

    }
}

export const clearVideoUrl = () => ({
    type: CLEAR_VIDEO_URL
})

export const getVideoUrl = (file) => async (dispatch) => {
    // dispatch(mainToggleIsFetching(true))
    try {
        const response = await MainAPI.videoUrl(file)
        console.log(response.data.url)
        dispatch({
            type: GET_VIDEO_URL,
            videoUrl: response.data.url

        })
        // dispatch(mainToggleIsFetching(false))
    } catch (e) {
        console.log("Error getVideoUrl", e.response)
        // dispatch(mainToggleIsFetching(false))
    }
}

//like
export const setVote = (vote) => ({
    type: SET_VOTE_AC,
    payload: vote
})

export const putLikeAC = (id, vote) => async (dispatch) => {
    // dispatch(mainToggleIsFetching(true))
    try {
        const response = await MoviesPreview.putLike(id, vote)
        // console.log(response.data)
        dispatch({
            type: PUT_LIKE_AC,
            payload: response.data

        })
        // dispatch(mainToggleIsFetching(false))
    } catch (e) {
        console.log("Error getVideoUrl", e.response)
        // dispatch(mainToggleIsFetching(false))
    }
}

//category

export const setCategoryId = (categoryId) => ({
    type: SET_CATEGORY_ID,
    categoryId
})
export const setIdSort = (idSort) => ({
    type: SET_ID_SORT,
    idSort
})

export const setCategoryFilter = (categoryFilter) => ({
    type: SET_CATEGORY_FILTER,
    categoryFilter
})

export const setFilterGenre = (id, name, checked) => ({
    type: SET_FILTER_GENRE,
    id, name, checked
})
export const setFilterYear = (filterYear) => ({
    type: SET_FILTER_YEAR,
    filterYear
})
export const setFilterTypeContent = (filterTypeContent) => ({
    type: SET_FILTER_TYPE_CONTENT,
    filterTypeContent
})
// export const setFilterTypeContent = (id, name, checked) => ({
//     type: SET_FILTER_TYPE_CONTENT,
//     id, name, checked
// })
export const setFilterCountry = (id, name, checked) => ({
    type: SET_FILTER_COUNTRY,
    id, name, checked
})


export const getCategory = (cid, currentPage, idSort) => async (dispatch) => {
    // dispatch(mainToggleIsFetching(true))
    try {
        const {data} = await MainAPI.category(cid, currentPage, idSort)
        dispatch({
            type: GET_CATEGORY,
            payload: data
        })
        // dispatch(mainToggleIsFetching(false))
    } catch (e) {
        console.log("Error getCategory", e.response)
        // dispatch(mainToggleIsFetching(false))

    }
}

export const setPageIncrement = () => ({
    type: SET_PAGE_INCREMENT
})

export const clearCategory = () => ({
    type: CLEAR_CATEGORY
})

export const setNewCategoryPage = (cid, currentPage, idSort) => async (dispatch) => {
    // dispatch(mainToggleIsFetching(true))
    try {
        const {data} = await MainAPI.category(cid, currentPage, idSort)
        console.log("data", cid, currentPage, idSort, data)
        dispatch({
            type: SET_NEW_CATEGORY_PAGE,
            payload: data
        })
        // dispatch(mainToggleIsFetching(false))
    } catch (e) {
        console.log("Error setNewCategoryPage", e)
        // dispatch(mainToggleIsFetching(false))

    }
}


export const getCategoryFilter = () => async (dispatch) => {
    // dispatch(mainToggleIsFetching(true))
    try {
        const {data} = await MainAPI.categoryFilter()
        // console.log(data)
        dispatch(setCategoryFilter(data))
        // dispatch(mainToggleIsFetching(false))
    } catch (e) {
        console.log("Error getCategoryFilter", e.response)
        // dispatch(mainToggleIsFetching(false))

    }
}

export const setSearchFilter = (search) => ({
    type: SET_FILTER_SEARCH,
    search
})
export const getSearchFilter = (genre, country, year, typeContent) => async (dispatch) => {
    // dispatch(mainToggleIsFetching(true))
    try {
        const {data} = await MainAPI.searchFilter(genre, country, year, typeContent)
        dispatch(setSearchFilter(data))
        // dispatch(mainToggleIsFetching(false))
    } catch (e) {
        console.log("Error getCategoryFilter", e.response)
        // dispatch(mainToggleIsFetching(false))

    }
}

//search
export const setSearchItems = (searchItems) => ({
    type: SET_SEARCH_ITEMS,
    searchItems
})
export const setNewSearchPage = () => ({
    type: SET_NEW_SEARCH_PAGE,
})
export const setClearSearchItems = () => ({
    type: SET_CLEAR_SEARCH_ITEMS,

})
export const getSearchItems = (query, limit) => async (dispatch) => {
    try {
        const {data} = await MainAPI.searchMovie(query, limit)
        dispatch(setSearchItems(data))
    } catch (e) {
        console.log("Error getSearchItems", e.response)
    }
}

//history
export const setHistoryItems = (historyItems) => ({
    type: SET_HISTORY_ITEMS,
    historyItems
})
export const setNewHistoryPage = () => ({
    type: SET_NEW_HISTORY_PAGE,
    })
export const getHistoryItems = (limit) => async (dispatch) => {
    try {
        const {data} = await MainAPI.historyMovie(limit)
        // console.log(data)
        dispatch(setHistoryItems(data))
    } catch (e) {
        console.log("Error getSearchItems", e.response)
    }
}

//bookmark
export const setBookmarkItems = (bookmarkItems) => ({
    type: SET_BOOKMARK_ITEMS,
    bookmarkItems
})
export const setBookmarkId = (bookmarkId) => ({
    type: SET_BOOKMARK_ID,
    bookmarkId
})

export const getBookmarkItems = () => async (dispatch) => {
    try {
        const {data} = await MainAPI.bookmark()
        // console.log(data)
        dispatch(setBookmarkItems(data))
    } catch (e) {
        console.log("Error getSearchItems", e.response)
    }
}
export const toggleBookmarkById = (id) => async (dispatch) => {
    try {

        const {data} = await MainAPI.bookmarkToggle(id)
        dispatch(setBookmarkId(data))
        // console.log(data)
    } catch (e) {
        console.log("Error getSearchItems", e.response)
    }
}
