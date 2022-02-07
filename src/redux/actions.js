import {AuthAPI, MainAPI, MoviesPreview} from "../API/API";
import {reactLocalStorage} from "reactjs-localstorage";

export const TOGGLE_AUTH_MODAL = "AUTH/TOGGLE_AUTH_MODAL"
export const SET_LOGIN = "AUTH/SET_LOGIN"
export const SET_PASSWORD = "AUTH/SET_PASSWORD"
export const AUTH_TOGGLE_IS_FETCHING = "AUTH/AUTH_TOGGLE_IS_FETCHING"
export const SET_TOKEN = "AUTH/SET_TOKEN"
export const SET_TOKEN_CODE = "AUTH/SET_TOKEN_CODE"
export const SET_CONNECTION_CODE = "AUTH/SET_CONNECTION_CODE"
export const CLEAR_TOKEN = "AUTH/CLEAR_TOKEN"
export const SET_ERROR = "AUTH/SET_ERROR"
export const CLEAR_ERROR = "AUTH/CLEAR_ERROR"

export const SET_USER_PROFILE = "AUTH/SET_USER_PROFILE"
export const CLEAR_USER_PROFILE = "AUTH/CLEAR_USER_PROFILE"

export const GET_MAIN = "MAIN/GET_MAIN";
export const GET_MOVIE_FILE = "MAIN/GET_MOVIE_FILE";
export const MAIN_TOGGLE_IS_FETCHING = "MAIN/MAIN_TOGGLE_IS_FETCHING"
export const GET_VIDEO_URL = "MAIN/GET_VIDEO_URL"
export const CLEAR_VIDEO_URL = "MAIN/CLEAR_VIDEO_URL"
export const SET_MOVIE_FILE_FOCUS = "MAIN/SET_MOVIE_FILE_FOCUS"
export const SET_MOVIE_CATEGORY_TITLE = "MAIN/SET_MOVIE_CATEGORY_TITLE"
export const CLEAR_MOVIE_FILE_FOCUS = "MAIN/CLEAR_MOVIE_FILE_FOCUS"
export const SET_CURRENT_ITEM_INCREMENT = "MAIN/SET_CURRENT_ITEM_INCREMENT"
export const SET_CURRENT_ITEM_DECREMENT = "MAIN/SET_CURRENT_ITEM_DECREMENT"
export const CLEAR_CURRENT_ITEM = "MAIN/CLEAR_CURRENT_ITEM"
export const SET_CURRENT_PATH = "MAIN/SET_CURRENT_PATH"
export const CLEAR_CURRENT_PATH = "MAIN/CLEAR_CURRENT_PATH"

export const PUT_LIKE_AC = "MoviesPreview/PUT_LIKE_AC"
export const SET_VOTE_AC = "MoviesPreview/SET_VOTE_AC"

export const CATEGORY_TOGGLE_IS_FETCHING = "CATEGORY/CATEGORY_TOGGLE_IS_FETCHING"
export const GET_CATEGORY = "CATEGORY/GET_CATEGORY"
export const SET_NEW_CATEGORY_PAGE = "CATEGORY/SET_NEW_CATEGORY_PAGE"
export const SET_PAGE_INCREMENT = "CATEGORY/SET_PAGE_INCREMENT"
export const CLEAR_PAGE = "CATEGORY/CLEAR_PAGE"
export const CLEAR_CATEGORY = "CATEGORY/CLEAR_CATEGORY"
export const SET_CATEGORY_ID = "CATEGORY/SET_CATEGORY_ID"
export const SET_ID_SORT = "CATEGORY/SET_ID_SORT"
export const SET_CATEGORY_FILTER = "CATEGORY/SET_CATEGORY_FILTER"
export const SET_FILTER_GENRE = "CATEGORY/SET_FILTER_GENRE"
export const SET_FILTER_YEAR = "CATEGORY/SET_FILTER_YEAR"
export const SET_FILTER_COUNTRY = "CATEGORY/SET_FILTER_COUNTRY"
export const SET_FILTER_TYPE_CONTENT = "CATEGORY/SET_FILTER_TYPE_CONTENT"
export const SET_FILTER_SEARCH = "CATEGORY/SET_FILTER_SEARCH"
export const SET_NEW_FILTER_SEARCH_PAGE = "CATEGORY/SET_NEW_FILTER_SEARCH_PAGE"

export const SET_SEARCH_TEXT = "SEARCH/SET_SEARCH_TEXT"
export const SET_IS_SEARCH_MODAL = "SEARCH/SET_IS_SEARCH_MODAL"
export const SET_SEARCH_ITEMS = "SEARCH/SET_SEARCH_ITEMS"
export const SET_NEW_SEARCH_PAGE = "SEARCH/SET_NEW_SEARCH_PAGE"
export const RESET_SEARCH_PAGE = "SEARCH/RESET_SEARCH_PAGE"
export const SET_CLEAR_SEARCH_ITEMS = "SEARCH/SET_CLEAR_SEARCH_ITEMS"
export const SET_ERROR_SEARCH_ITEMS = "SEARCH/SET_ERROR_SEARCH_ITEMS"

export const SET_HISTORY_ITEMS = "HistoryPage/SET_HISTORY_ITEMS"
export const SET_NEW_HISTORY_PAGE = "HistoryPage/SET_NEW_HISTORY_PAGE"

export const SET_BOOKMARK_ITEMS = "BookMark/SET_BOOKMARK_ITEMS"
export const SET_BOOKMARK_ID = "BookMark/SET_BOOKMARK_ID"
export const SET_NEW_BOOKMARK_PAGE = "BookMark/SET_NEW_BOOKMARK_PAGE"

export const SET_MEDIA_FILES = "MoviesSeries/SET_MEDIA_FILES"
export const SET_CURRENT_SEASON = "MoviesSeries/SET_CURRENT_SEASON"
export const SET_CURRENT_SERIES = "MoviesSeries/SET_CURRENT_SERIES"
export const SET_ITEM_FOCUS = "MoviesSeries/SET_ITEM_FOCUS"
export const CLEAR_ITEM_FOCUS = "MoviesSeries/CLEAR_ITEM_FOCUS"

export const SET_FOCUS_REF = "CustomControls/SET_FOCUS_REF"

// export const SET_FILTER_SEARCH = "CATEGORY/SET_FILTER_SEARCH"

export const setLogin = (login) => ({
    type: SET_LOGIN,
    login
})
export const setPassword = (password) => ({
    type: SET_PASSWORD,
    password
})
export const toggleAuthModal = (isAuthModal) => ({
    type: TOGGLE_AUTH_MODAL,
    isAuthModal
})
export const authToggleIsFetching = (IsFetching) => ({
    type: AUTH_TOGGLE_IS_FETCHING,
    IsFetching
})
export const setToken = (token) => ({
    type: SET_TOKEN,
    token
})
export const setTokenCode = (tokenCode) => ({
    type: SET_TOKEN_CODE,
    tokenCode
})
export const setConnectionCode = (connectionCode) => ({
    type: SET_CONNECTION_CODE,
    connectionCode
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
        // console.log("Auth", data.data.token)
        dispatch(clearError())
        dispatch(authToggleIsFetching(false))
    } catch (e) {
        dispatch(setError(e.response.data.error.message))
        console.log("Error getToken", e.response.data.error.message)
        dispatch(authToggleIsFetching(false))
    }
}
export const getTokenCode = (code_UID, token) => async (dispatch) => {
    dispatch(authToggleIsFetching(true))
    try {
        const {data} = await AuthAPI.loginMobil(code_UID, token)
        if (data.code) {
            dispatch(setTokenCode(data.code))
        }
        if (data.token) {
            dispatch(setToken(data.token))
        }
        // console.log("AuthCode_UID", data)
        dispatch(authToggleIsFetching(false))
    } catch (e) {
        // dispatch(setError(e.response.data.error.message))
        console.log("Error getTokenCode", e.response.data.error.message)
        dispatch(authToggleIsFetching(false))
    }
}

//logout
export const getLogout = () => async (dispatch) => {
    try {
        await AuthAPI.logout()
        dispatch(clearToken())
        dispatch(clearUserProfile())
        reactLocalStorage.remove("token");
        reactLocalStorage.remove("code");
    } catch (e) {
        console.log("Error getToken", e.response)
    }
}

//userProfile
export const setUserProfile = (userProfile) => ({
    type: SET_USER_PROFILE,
    userProfile
})
export const clearUserProfile = () => ({
    type: CLEAR_USER_PROFILE
})

export const getUserProfile = () => async (dispatch) => {
    try {
        const {data} = await AuthAPI.userProfile()
        dispatch(setUserProfile(data))
    } catch (e) {
        console.log("Error getUserProfile", e.response)
        // dispatch(clearToken())
    }
}

export const mainToggleIsFetching = (IsFetching) => ({
    type: MAIN_TOGGLE_IS_FETCHING,
    IsFetching
})

//main
export const getMain = (token, code) => async (dispatch) => {
    dispatch(mainToggleIsFetching(true))
    try {
        // await AuthAPI.setAuthToken(token)
        const {data} = await MainAPI.main(token, code)
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
        // console.log(response.data.url)
        dispatch({
            type: GET_VIDEO_URL,
            videoUrl: response.data.url

        })
        // dispatch(mainToggleIsFetching(false))
    } catch (e) {
        console.log("Error getVideoUrl", e.response)
        // dispatch(clearToken())
        // dispatch(mainToggleIsFetching(false))
    }
}

export const setMovieFileFocus = (item) => ({
    type: SET_MOVIE_FILE_FOCUS,
    item
})
export const setMovieCategoryTitle = (title) => ({
    type: SET_MOVIE_CATEGORY_TITLE,
    title
})
export const clearMovieFileFocus = () => ({
    type: CLEAR_MOVIE_FILE_FOCUS,
})
export const setCurrentItemInc = () => ({
    type: SET_CURRENT_ITEM_INCREMENT,
})
export const setCurrentItemDec = () => ({
    type: SET_CURRENT_ITEM_DECREMENT,
})
export const clearCurrentItem = () => ({
    type: CLEAR_CURRENT_ITEM,
})
export const setCurrentPath = (path) => ({
    type: SET_CURRENT_PATH,
    path
})
export const clearCurrentPath = () => ({
    type: CLEAR_CURRENT_PATH,
})

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
        dispatch(clearToken())
        // dispatch(mainToggleIsFetching(false))
    }
}

//category

export const categoryToggleIsFetching = (payload) => ({
    type: CATEGORY_TOGGLE_IS_FETCHING,
    payload
})
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
    dispatch(categoryToggleIsFetching(true))
    try {
        const {data} = await MainAPI.category(cid, currentPage, idSort)
        dispatch({
            type: GET_CATEGORY,
            payload: data
        })
        dispatch(categoryToggleIsFetching(false))
    } catch (e) {
        console.log("Error getCategory", e.response)
        dispatch(categoryToggleIsFetching(false))

    }
}

export const setPageIncrement = () => ({
    type: SET_PAGE_INCREMENT
})
export const clearPage = () => ({
    type: CLEAR_PAGE
})

export const clearCategory = () => ({
    type: CLEAR_CATEGORY
})

export const setNewCategoryPage = (cid, currentPage, idSort) => async (dispatch) => {
    // dispatch(mainToggleIsFetching(true))
    try {
        const {data} = await MainAPI.category(cid, currentPage, idSort)
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
//searchFilter
export const setSearchFilter = (search) => ({
    type: SET_FILTER_SEARCH,
    search
})
export const setNewSearchFilterPage = (search) => ({
    type: SET_NEW_FILTER_SEARCH_PAGE,
    search
})
export const getSearchFilter = (genre, country, year, typeContent, page) => async (dispatch) => {
    // dispatch(mainToggleIsFetching(true))
    try {
        const {data} = await MainAPI.searchFilter(genre, country, year, typeContent, page)
        dispatch(setSearchFilter(data))
        // dispatch(mainToggleIsFetching(false))
    } catch (e) {
        console.log("Error getCategoryFilter", e.response)
        // dispatch(mainToggleIsFetching(false))

    }
}
export const getNewSearchFilterPage = (genre, country, year, typeContent, page) => async (dispatch) => {
    // dispatch(mainToggleIsFetching(true))
    try {
        const {data} = await MainAPI.searchFilter(genre, country, year, typeContent, page)
        dispatch(setNewSearchFilterPage(data))
        // dispatch(mainToggleIsFetching(false))
    } catch (e) {
        console.log("Error getCategoryFilter", e.response)

        // dispatch(mainToggleIsFetching(false))

    }
}

//search
export const setSearchText = (text) => ({
    type: SET_SEARCH_TEXT,
    payload: text
})
export const toggleSearchModal = (isSearchModal) => ({
    type: SET_IS_SEARCH_MODAL,
    payload: isSearchModal
})
export const setSearchItems = (searchItems) => ({
    type: SET_SEARCH_ITEMS,
    searchItems
})
export const setNewSearchPage = () => ({
    type: SET_NEW_SEARCH_PAGE,
})
export const resetSearchPage = () => ({
    type: RESET_SEARCH_PAGE,
})
export const setClearSearchItems = () => ({
    type: SET_CLEAR_SEARCH_ITEMS,
})
export const setErrorSearchItems = (error) => ({
    type: SET_ERROR_SEARCH_ITEMS,
    error
})

export const getSearchItems = (query, limit) => async (dispatch) => {
    try {
        const {data} = await MainAPI.searchMovie(query, limit)
        dispatch(setSearchItems(data))
        dispatch(setErrorSearchItems(null))

    } catch (e) {
        console.log("Error getSearchItems", e.response)
        if (e.response.status === 490) {
            if (e.response.data.error.code === 1001) {
                dispatch(setErrorSearchItems("Количество символов в поле должно быть не меньше 3"))
            }

        }

        // dispatch(clearToken())
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
        console.log("Error setHistoryItems", e.response)
        dispatch(clearToken())
    }
}

//bookmark
export const setBookmarkItems = (bookmarkItems) => ({
    type: SET_BOOKMARK_ITEMS,
    bookmarkItems
})
export const setNewBookmarkPage = () => ({
    type: SET_NEW_BOOKMARK_PAGE,
})
export const setBookmarkId = (bookmarkId) => ({
    type: SET_BOOKMARK_ID,
    bookmarkId
})

export const getBookmarkItems = (limit) => async (dispatch) => {
    try {
        const {data} = await MainAPI.bookmark(limit)
        // console.log(data)
        dispatch(setBookmarkItems(data))
    } catch (e) {
        console.log("Error getBookmarkItems", e.response)
        dispatch(clearToken())
    }
}
export const toggleBookmarkById = (id) => async (dispatch) => {
    try {

        const {data} = await MainAPI.bookmarkToggle(id)
        dispatch(setBookmarkId(data))
        // console.log(data)
    } catch (e) {
        console.log("Error getBookmarkItems", e.response)
        dispatch(clearToken())
    }
}

//MoviesSeries
export const setMediaFiles = (mediaFiles) => ({
    type: SET_MEDIA_FILES,
    mediaFiles
})
export const setCurrentSeason = () => ({
    type: SET_CURRENT_SEASON,
})
export const setCurrentSeries = () => ({
    type: SET_CURRENT_SERIES,
})
export const setItemFocus = () => ({
    type: SET_ITEM_FOCUS,
})
export const clearItemFocus = () => ({
    type: CLEAR_ITEM_FOCUS,
})

//player
export const setFocusRef = (focusRef) => ({
    type: SET_FOCUS_REF,
    focusRef
})
