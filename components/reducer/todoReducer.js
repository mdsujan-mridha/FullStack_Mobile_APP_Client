import {
    ADMIN_TODO_REQUEST,
    ALL_TODO_REQUEST,
    ALL_TODO_SUCCESS,
    ALL_TODO_FAIL,
    ADMIN_TODO_SUCCESS,
    ADMIN_TODO_FAIL,
    NEW_TODO_REQUEST,
    NEW_TODO_SUCCESS,
    NEW_TODO_RESET,
    NEW_TODO_FAIL,
    UPDATE_TODO_REQUEST,
    UPDATE_TODO_SUCCESS,
    UPDATE_TODO_RESET,
    UPDATE_TODO_FAIL,
    DELETE_TODO_REQUEST,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_RESET,
    DELETE_TODO_FAIL,
    TODO_DETAILS_REQUEST,
    TODO_DETAILS_SUCCESS,
    TODO_DETAILS_FAIL,
    CLEAR_ERRORS,
    MY_TODO_REQUEST,
    MY_TODO_SUCCESS,
    MY_TODO_FAIL,

} from "../constant/todoConstant";



export const todosReducer = (state = { todos: [] }, action) => {
    switch (action.type) {
        // if i get TODO request from clint site then i set loading true and also return empty TODO objet

        case ALL_TODO_REQUEST:
        case ADMIN_TODO_REQUEST:
            return {
                loading: true,
                todos: []
            }
        //   if the request is success then set loading false and return TODO 
        case ALL_TODO_SUCCESS:

            return {
                loading: false,
                todoss: action.payload.TODOs,
                todosCount: action.payload.TODOsCount,
                resultPerPage: action.payload.resultPerPage,
                filteredTodosCount: action.payload.filteredTODOsCount,
            }
        case ADMIN_TODO_SUCCESS:
            return {
                loading: false,
                todos: action.payload,
            }
        case ALL_TODO_FAIL:
        case ADMIN_TODO_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }

        default:
            return state;
    }
};


//   for single TODO details 
export const todoDetailsReducer = (state = { todo: {} }, action) => {
    switch (action.type) {
        // if i get TODO request from clint site then i set loading true and also return empty TODO objet

        case TODO_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            }
        //   if the request is success then set loading false and return TODO 
        case TODO_DETAILS_SUCCESS:
            return {
                loading: false,
                todo: action.payload,

            }
        case TODO_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }

        default:
            return state;
    }
};



// delete TODO by admin 
export const todoReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_TODO_REQUEST:
        case UPDATE_TODO_REQUEST:

            return {
                ...state,
                loading: true
            }
        case DELETE_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            }
        case UPDATE_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdate: action.payload,
            }

        case DELETE_TODO_FAIL:
        case UPDATE_TODO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case DELETE_TODO_RESET:
            return {
                ...state,
                isDeleted: false,
            }
        case UPDATE_TODO_RESET:
            return {
                ...state,
                isUpdate: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}

// create new TODO 
export const newTodoReducer = (state = { todo: {} }, action) => {

    switch (action.type) {

        case NEW_TODO_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_TODO_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                todos: action.payload.todos,
            }
        case NEW_TODO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case NEW_TODO_RESET:
            return {
                ...state,
                loading: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state

    }

}

export const myTodosReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case MY_TODO_REQUEST:
            return {
                loading: true,
            };

        case MY_TODO_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };

        case MY_TODO_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};