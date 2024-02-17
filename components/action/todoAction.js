import axios from "axios";
import {
    TODO_DETAILS_REQUEST,
    TODO_DETAILS_SUCCESS,
    TODO_DETAILS_FAIL,
    ADMIN_TODO_REQUEST,
    ADMIN_TODO_SUCCESS,
    ADMIN_TODO_FAIL,
    NEW_TODO_REQUEST,
    NEW_TODO_SUCCESS,
    NEW_TODO_FAIL,
    UPDATE_TODO_REQUEST,
    UPDATE_TODO_SUCCESS,
    UPDATE_TODO_FAIL,
    DELETE_TODO_REQUEST,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_FAIL,
    CLEAR_ERRORS,
    MY_TODO_REQUEST,
    MY_TODO_SUCCESS,
    MY_TODO_FAIL,
} from "../constant/todoConstant";

// get single products details 
export const getTodoDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: TODO_DETAILS_REQUEST });

        const { data } = await axios.get(`https://emerald-capybara-slip.cyclic.cloud/api/v1/todo/${id}`);

        dispatch({
            type: TODO_DETAILS_SUCCESS,
            // if i get product Which in need then set it on payload 
            payload: data.todo
        })

    } catch (error) {
        dispatch({
            type: TODO_DETAILS_FAIL,
            payload: error?.error?.response?.data?.message,
        });
    }
};



// get all product by admin  
export const getAdminTodo = () => async (dispatch) => {

    try {
        dispatch({ type: ADMIN_TODO_REQUEST })
        const { data } = await axios.get(`https://emerald-capybara-slip.cyclic.cloud/api/v1/admin/todos`)
        dispatch({
            type: ADMIN_TODO_SUCCESS,
            payload: data.todos,
        })
    } catch (error) {
        dispatch({
            type: ADMIN_TODO_FAIL,
            payload: error.response.data.message
        })
    }

}


// delete product by admin 
export const deleteTodo = (id) => async (dispatch) => {

    try {

        dispatch({
            type: DELETE_TODO_REQUEST
        })
        const { data } = await axios.delete(`https://emerald-capybara-slip.cyclic.cloud/api/v1/todo/${id}`)
        dispatch({
            type: DELETE_TODO_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_TODO_FAIL,
            payload: error.response.data.message
        })
    }

}
// create new product by admin 
export const createTodo = (todoData) => async (dispatch) => {

    try {
        dispatch({ type: NEW_TODO_REQUEST })
        //   const config = {
        //     headers:{
        //         "Content-type":"application/json"
        //     }
        //   }
        const data = await axios.post(`https://emerald-capybara-slip.cyclic.cloud/api/v1/todo/new`, todoData);
     
        dispatch({
            type: NEW_TODO_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEW_TODO_FAIL,
            payload: error.response?.data.message
        })
    }

}

export const updateTodo = (id, todoData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_TODO_REQUEST })
        const { data } = await axios.put(`https://emerald-capybara-slip.cyclic.cloud/api/v1/todo/${id}`, todoData)
        dispatch({
            type: UPDATE_TODO_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: UPDATE_TODO_FAIL,
            payload: error.response.data.message
        })
    }
};

// my todo
export const myTodos = () => async (dispatch) => {
    try {

        dispatch({ type: MY_TODO_REQUEST })
        const { data } = await axios.get(`https://emerald-capybara-slip.cyclic.cloud/api/v1/my/todo`);
        console.log(data);

        dispatch({
            type: MY_TODO_SUCCESS,
            payload: data.todos
        })
    } catch (error) {
        dispatch({
            type: MY_TODO_FAIL,
            payload: error.response.data.message,
        })
    }
}



// clear error 
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}