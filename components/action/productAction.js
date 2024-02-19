import axios from "axios";
import {

    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    //  single products details 
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_SUCCESS,
    CLEAR_ERRORS,
    ADMIN_PRODUCT_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    ALL_REVIEW_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL

} from "../constant/productConstant"

export const getProduct = (category) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });

        let link = `https://emerald-capybara-slip.cyclic.cloud/api/v1/products`;

        if (category) {
            link = `https://emerald-capybara-slip.cyclic.cloud/api/v1/products?category=${category}`;
        }

        const { data } = await axios.get(link);
        // console.log(data);r
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error?.error?.response?.data?.message,
        });
    }
};

// get single products details 
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`https://emerald-capybara-slip.cyclic.cloud/api/v1/product/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            // if i get product Which in need then set it on payload 
            payload: data.product
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error?.error?.response?.data?.message,
        });
    }
};

//new review action 

export const newReview = (reviewData) => async (dispatch) => {

    try {
        dispatch({ type: NEW_REVIEW_REQUEST })
        const config = {
            headers: { "Content-Type": "application/json" }
        };
        const data = await axios.put(`https://emerald-capybara-slip.cyclic.cloud/api/v1/review`, reviewData, config);
        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }

}

// get all product by admin  
export const getAdminProduct = () => async (dispatch) => {

    try {
        dispatch({ type: ADMIN_PRODUCT_REQUEST })
        const { data } = await axios.get(`https://emerald-capybara-slip.cyclic.cloud/api/v1/admin/products`)
        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data.products,
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }

}


// delete product by admin 
export const deleteProduct = (id) => async (dispatch) => {

    try {

        dispatch({
            type: DELETE_PRODUCT_REQUEST
        })
        const { data } = await axios.delete(`https://emerald-capybara-slip.cyclic.cloud/api/v1/admin/product/${id}`)
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }

}
// create new product by admin 
export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST })
        const config = {
            headers: {
                "Content-type": "multipart/form-data"
            }
        }
        const data = await axios.post(`https://emerald-capybara-slip.cyclic.cloud/api/v1/new/product`, productData,config)
        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response?.data.message
        })
    }
}
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST })
        const { data } = await axios.put(`https://emerald-capybara-slip.cyclic.cloud/api/v1/admin/product/${id}`, productData)
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}
// gate all review by admin 
export const getAllReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_REVIEW_REQUEST })
        const { data } = await axios.get(`https://emerald-capybara-slip.cyclic.cloud/api/v1/reviews?id=${id}`)
        dispatch({
            type: ALL_REVIEW_SUCCESS,
            payload: data.reviews,
        })
    } catch (error) {
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: error.response.data.message,
        })
    }
}

// delete review by admin 
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST });

        const { data } = await axios.delete(
            `https://emerald-capybara-slip.cyclic.cloud/api/v1/reviews?id=${reviewId}&productId=${productId}`
        );

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

// clear error 
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}