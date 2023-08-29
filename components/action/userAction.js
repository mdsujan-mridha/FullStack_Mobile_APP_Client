import axios from "axios"
import {
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from "../constant/userConstant"

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.post(`https://emerald-capybara-slip.cyclic.cloud/api/v1/login`, { email, password }, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user,
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

export const registerUser = (name, email, password) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_REQUEST })
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.post(`https://emerald-capybara-slip.cyclic.cloud/api/v1/register`, { name, email, password }, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: data.user,
        })

    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.message

        })
    }
}

// load logged user 
export const loadUser = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST })
        const { data } = await axios.get(`https://emerald-capybara-slip.cyclic.cloud/api/v1/me`)
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user,
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message,
        })
    }

};

// logout user 
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`https://emerald-capybara-slip.cyclic.cloud/api/v1/logout`)
        dispatch({ type: LOGOUT_SUCCESS })
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.message
        })
    }
}