import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { addToCart } from '../actions/cartActions'
import Message from '../components/Message'


const CartScreen = ({ match: { params: { id }}, location, history }) => {
    const productId = id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    const { cartItems } = useSelector(({cart}) => cart)
    console.log(cartItems)
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])
    return (
        <>
            Cart Screen
        </>
    )
}
export default CartScreen