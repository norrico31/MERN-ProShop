import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducers = (state = { cartItems: [] }, action) => {
    const { type, payload } = action
    switch (type) {
        case CART_ADD_ITEM:
            const item = payload
            const existItem = state.cartItems.find(x => x.product === item.product)
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(cartItem => cartItem.product === existItem.product ? item : cartItem)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        
        default:
            return state
    }
}