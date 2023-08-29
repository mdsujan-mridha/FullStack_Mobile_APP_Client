
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./components/reducer/userReducer";


const reducer = combineReducers({
    user: userReducer
})
const initialState = {};
const middleware = [thunk]


const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
)

export default store;