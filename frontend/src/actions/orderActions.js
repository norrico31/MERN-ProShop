import { ADMIN_ORDER_DELIVER_FAIL, ADMIN_ORDER_DELIVER_REQUEST, ADMIN_ORDER_DELIVER_SUCCESS, ADMIN_ORDER_LIST_FAIL, ADMIN_ORDER_LIST_REQUEST, ADMIN_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from '../constants/orderConstants'
import axios from 'axios'

export const createOrder = order => async (dispatch, getState) => {
    const { userLogin: { userInfo }} = getState()
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/orders`, order, config)
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data 
        })
    } catch (err) {
        dispatch({ 
            type: ORDER_CREATE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const getOrderDetails = orderId => async (dispatch, getState) => {
    const { userLogin: { userInfo }} = getState()
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/${orderId}`, config)
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data 
        })
    } catch (err) {
        dispatch({ 
            type: ORDER_DETAILS_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    const { userLogin: { userInfo }} = getState()
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult,  config)
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data 
        })
    } catch (err) {
        dispatch({ 
            type: ORDER_PAY_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const myListOrders = () => async (dispatch, getState) => {
    const { userLogin: { userInfo }} = getState()
    try {
        dispatch({
            type: MY_ORDER_LIST_REQUEST
        })
        const { data } = await axios.get(`/api/orders/myorders`, { headers: { Authorization: `Bearer ${userInfo.token}` }})
        dispatch({
            type: MY_ORDER_LIST_SUCCESS,
            payload: data 
        })
    } catch (err) {
        dispatch({ 
            type: MY_ORDER_LIST_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const adminListOrder = () => async (dispatch, getState) => {
    const { userLogin: { userInfo: { token } }} = getState()
    try {
        dispatch({
            type: ADMIN_ORDER_LIST_REQUEST
        })
        const { data } = await axios.get(`/api/orders`, { headers: { Authorization: `Bearer ${token}` }})
        dispatch({
            type: ADMIN_ORDER_LIST_SUCCESS,
            payload: data 
        })
    } catch (err) {
        dispatch({ 
            type: ADMIN_ORDER_LIST_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}


export const deliverOrder = order => async (dispatch, getState) => {
    const { userLogin: { userInfo }} = getState()
    try {
        dispatch({
            type: ADMIN_ORDER_DELIVER_REQUEST
        })
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {}, config)
        dispatch({
            type: ADMIN_ORDER_DELIVER_SUCCESS,
            payload: data 
        })
    } catch (err) {
        dispatch({ 
            type: ADMIN_ORDER_DELIVER_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}