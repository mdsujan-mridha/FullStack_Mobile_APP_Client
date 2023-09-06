
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./components/reducer/userReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
    user: userReducer
})
const initialState = {};
const middleware = [thunk]


const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;