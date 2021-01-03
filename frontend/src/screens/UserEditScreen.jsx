import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserByAdmin } from '../actions/userActions'
import { ADMIN_USER_UPDATE_RESET } from '../constants/userConstants'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    
    const dispatch = useDispatch()
    const { loading, error, user } = useSelector(({userDetails}) => userDetails)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector(state => state.userUpdateByAdmin)
    
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: ADMIN_USER_UPDATE_RESET })
            history.push('/admin/userlist')
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [userId, user, dispatch, history, successUpdate])

    const onSubmitHandler = e => {
        e.preventDefault()
        dispatch(updateUserByAdmin({ _id: userId, name, email, isAdmin }))
    }
    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? (<Loader />) : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={onSubmitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId='isadmin'>
                            <Form.Check type="checkbox" label='Is Admin' checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
                        </Form.Group>
                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}
export default UserEditScreen