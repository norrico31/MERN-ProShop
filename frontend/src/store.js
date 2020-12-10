import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducers } from './reducers/cartReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducers
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parts(localStorage.getItem('cartItems')) : []
const initialState = {
    cart: { cartItems: cartItemsFromStorage }
}
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store