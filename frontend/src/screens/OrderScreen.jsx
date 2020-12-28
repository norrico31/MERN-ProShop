import { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ORDER_PAY_RESET, ADMIN_ORDER_DELIVER_RESET } from '../constants/orderConstants'

const OrderScreen = ({ match: { params }, history }) => {
    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.userLogin)
    const { loading, order, error } = useSelector(({orderDetails}) => orderDetails)
    const { success: successPay, loading: loadingPay } =  useSelector(state => state.orderPay)
    const { success: successDeliver, loading: loadingDeliver } =  useSelector(state => state.orderDeliverAdmin)
    
    if (!loading) {
        const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2)
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        const addPaypalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if (!order || successPay || order._id !== params.id || successDeliver) {
            dispatch({ type: ADMIN_ORDER_DELIVER_RESET })
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(params.id))
        } else if (!order.isPaid) {
            if(!window.paypal) addPaypalScript()
            else setSdkReady(true)
        }
    }, [dispatch, params, order, successPay, successDeliver, userInfo, history])

    const successPaymentHandler = paymentResult => {
        console.log(paymentResult)
        dispatch(payOrder(params.id, paymentResult))
    }

    const onDeliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name:</strong> {order.user.name}</p>
                            <p><strong>Email: </strong><Link to={`mailto:${order.user.email}`}>{order.user.email}</Link></p>
                            <p>
                                <strong>Address:</strong>{' '}
                                {order.shippingAddress.address}, {order.shippingAddress.city}.
                                {order.shippingAddress.postcalCode} {' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : <Message variant='danger'>Not Delivered</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Not Paid</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems === 0 ? (<Message>Order cart is empty</Message>) : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, i) => (
                                        <ListGroup.Item key={i}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax Price</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (<ListGroup.Item>
                                {loadingPay && <Loader />}
                                {!sdkReady ? <Loader /> : (<PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />)}
                            </ListGroup.Item>)}
                            {loadingDeliver && <Loader />}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button type="button" className="btn btn-block" onClick={onDeliverHandler}>Mark As Delivered</Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
export default OrderScreen