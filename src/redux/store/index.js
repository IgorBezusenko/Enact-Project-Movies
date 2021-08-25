import {authReducer} from "../reducers/authReducer";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {mainReducer} from "../reducers/mainReducer";
import {likeReducer} from "../reducers/likeReducer";
import {categoryReducer} from "../reducers/categoryReducer";
import {playerReducer} from "../reducers/playerReducer";
import {searchReducer} from "../reducers/searchReducer";
import {historyReducer} from "../reducers/historyReducer";

const rootReducer = combineReducers({
    authReducer,
    mainReducer,
    likeReducer,
    categoryReducer,
    playerReducer,
    searchReducer,
    historyReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
