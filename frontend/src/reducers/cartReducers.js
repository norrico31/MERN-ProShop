import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducers = (state = { cartItems: [] }, action) => {
    const { type, payload } = action
    switch (type) {
        case CART_ADD_ITEM:
            const existItem = state.cartItems.find(cartItem => cartItem.product === payload.product)
            if (existItem) {
                return {
                    ...state,
                    cartitems: state.cartItems.map(cartItem => cartItem.product === existItem.product ? payload : cartItem)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, payload]
                }
            }
        
        default:
            return state
    }
}