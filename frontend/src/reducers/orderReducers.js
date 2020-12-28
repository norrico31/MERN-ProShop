import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_RESET, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL, MY_ORDER_LIST_RESET, ADMIN_ORDER_LIST_REQUEST, ADMIN_ORDER_LIST_SUCCESS, ADMIN_ORDER_LIST_FAIL, ADMIN_ORDER_DELIVER_REQUEST, ADMIN_ORDER_DELIVER_SUCCESS, ADMIN_ORDER_DELIVER_FAIL, ADMIN_ORDER_DELIVER_RESET } from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true }
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: payload
            }
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: payload
            }
        default: 
            return state
    }
}

export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, { type, payload }) => {
    switch (type) {
        case ORDER_DETAILS_REQUEST:
            return { 
                ...state,
                loading: true 
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: payload
            }
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: payload
            }
        default: 
            return state
    }
}

export const orderPayReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ORDER_PAY_REQUEST:
            return { 
                loading: true 
            }
        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: payload
            }
        case ORDER_PAY_RESET:
            return {}
        default: 
            return state
    }
}

export const myOrderListReducer = (state = { orders: [] }, { type, payload }) => {
    switch (type) {
        case MY_ORDER_LIST_REQUEST:
            return { 
                loading: true 
            }
        case MY_ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: payload
            }
        case MY_ORDER_LIST_FAIL:
            return {
                loading: false,
                error: payload
            }
        case MY_ORDER_LIST_RESET:
            return { orders: [] }
        default: 
            return state
    }
}

export const adminOrderListReducer = (state = { orders: [] }, { type, payload }) => {
    switch (type) {
        case ADMIN_ORDER_LIST_REQUEST:
            return { 
                loading: true 
            }
        case ADMIN_ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: payload
            }
        case ADMIN_ORDER_LIST_FAIL:
            return {
                loading: false,
                error: payload
            }
        default: 
            return state
    }
}

export const adminOrderDeliverReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ADMIN_ORDER_DELIVER_REQUEST:
            return { 
                loading: true 
            }
        case ADMIN_ORDER_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case ADMIN_ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error: payload
            }
        case ADMIN_ORDER_DELIVER_RESET:
            return {}
        default: 
            return state
    }
}