import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants'

export const cartReducers = (state = { cartItems: [], shippingAddress: {} }, { type, payload }) => {
    switch (type) {
        case CART_ADD_ITEM:
            const existItem = state.cartItems.find(prevItem => prevItem.product === payload.product)
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(prevItem => prevItem.product === existItem.product ? payload : prevItem)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, payload]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(prevItem => prevItem.product !== payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: payload
            }
        default:
            return state
    }
}