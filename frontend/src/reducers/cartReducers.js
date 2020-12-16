import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants'

export const cartReducers = (state = { cartItems: [], shippingAddress: {} }, { type, payload }) => {
    switch (type) {
        case CART_ADD_ITEM:
            const item = payload
            const existItem = state.cartItems.find(prevItem => prevItem.product === item.product)
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(prevItem => prevItem.product === existItem.product ? item : prevItem)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
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
        default:
            return state
    }
}