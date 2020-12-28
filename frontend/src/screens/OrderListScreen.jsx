import { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { adminListOrder } from '../actions/orderActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const OrderListScreen = ({ history }) => {
    const dispatch = useDispatch()
    const { loading, orders, error } = useSelector(state => state.OrderListAdmin)
    const { userInfo } = useSelector(({userLogin}) => userLogin)

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) return dispatch(adminListOrder())
        return history.push('/login')
    }, [dispatch, userInfo, history])

    return (
        <>
            <h1>Orders</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>
                                    {order.createdAt.substring(0, 10)}
                                </td>
                                <td>
                                    ${order.totalPrice}
                                </td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }} />}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }} />}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}
export default OrderListScreen