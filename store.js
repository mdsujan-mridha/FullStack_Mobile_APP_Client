
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { allUserReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./components/reducer/userReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import { newProductReducer, productDetailsReducer, productReducer, productsReducer } from "./components/reducer/productReducer";
import { myTodosReducer, newTodoReducer, todoReducer } from "./components/reducer/todoReducer";

const reducer = combineReducers({
    user: userReducer,
    products: productsReducer,
    // get single products details 
    productDetails: productDetailsReducer,
    // user reducer 
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    product: productReducer,
    newProduct: newProductReducer,
    allUsers: allUserReducer,
    userDetails: userDetailsReducer,
    myTodos: myTodosReducer,
    newTodo: newTodoReducer,
    todo: todoReducer,
})
const initialState = {};
const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;