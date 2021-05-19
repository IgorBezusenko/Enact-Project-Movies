import {authReducer} from "../reducers/authReducer";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {mainReducer} from "../reducers/mainReducer";


const rootReducer = combineReducers({
    authReducer,
    mainReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))