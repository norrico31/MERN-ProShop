import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersListByAdmin, deleteUserByAdmin } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const UserList = ({ history }) => {
    const dispatch = useDispatch()
    const { loading, users, error } = useSelector(state => state.userListByAdmin)
    const { userInfo } = useSelector(({userLogin}) => userLogin)
    const { success: successDelete } = useSelector(({userDeleteByAdmin}) => userDeleteByAdmin)

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) return dispatch(getUsersListByAdmin())
        return history.push('/login')
    }, [dispatch, userInfo, history, successDelete])

    const onDeleteHandler = userId => {
        if (window.confirm('Are you sure')) dispatch(deleteUserByAdmin(userId))
    }
    return (
        <>
            <h1>Accounts</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>ADMIn</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td><Link to={`mailto:${user.email}`}>{user.email}</Link></td>
                                <td>{user.isAdmin ? (<i className='fas fa-check' style={{ color: 'green' }}/>) : <i className='fas fa-times' style={{ color: 'red' }} />}</td>
                                <td>
                                    <LinkContainer to={`/user/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'/>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => onDeleteHandler(user._id)}>
                                        <i className='fas fa-trash'/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}
export default UserList