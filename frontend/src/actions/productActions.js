import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL } from '../constants/productConstants'
import axios from 'axios'

export const listProducts = () => async dispatch => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const res = await axios.get('/api/products')
        dispatch({ 
            type: PRODUCT_LIST_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        dispatch({ 
            type: PRODUCT_LIST_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
} 

export const listProductDetails = id => async dispatch => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({ 
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({ 
            type: PRODUCT_DETAILS_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const deleteProduct = productId => async (dispatch, getState) => {
    const { userLogin: { userInfo: { token } }} = getState()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST })
        await axios.delete(`/api/products/${productId}`, config)
        dispatch({ type: PRODUCT_DELETE_SUCCESS })
    } catch (err) {
        dispatch({ 
            type: PRODUCT_DELETE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}