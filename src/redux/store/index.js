import {authReducer} from "../reducers/authReducer";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {mainReducer} from "../reducers/mainReducer";
import {likeReducer} from "../reducers/likeReducer";
import {categoryReducer} from "../reducers/categoryReducer";
import {playerReducer} from "../reducers/playerReducer";
import {searchReducer} from "../reducers/searchReducer";
import {historyReducer} from "../reducers/historyReducer";
import {bookmarkReducer} from "../reducers/bookmarkReducer";
import {seriesReducer} from "../reducers/seriesReducer";

const rootReducer = combineReducers({
    authReducer,
    mainReducer,
    likeReducer,
    categoryReducer,
    playerReducer,
    searchReducer,
    historyReducer,
    bookmarkReducer,
    seriesReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
