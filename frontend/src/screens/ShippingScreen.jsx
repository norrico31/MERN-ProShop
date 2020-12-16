import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'

const ShippingScreen = ({ history }) => {
    const { shippingAddress } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postcalCode, setPostcalCode] = useState(shippingAddress.postcalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const onSubmitHandler = e => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postcalCode, country }))
        history.push('/payment')
    }
    return (
        <FormContainer>
            <h1>Shipping</h1>
            <Form onSubmit={onSubmitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='text' placeholder='Enter address' value={address} required onChange={e => setAddress(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Enter city" required value={city} onChange={e => setCity(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='postcalcode'>
                    <Form.Label>Postcal Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter postcal code" required value={postcalCode} onChange={e => setPostcalCode(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Enter country" required value={country} onChange={e => setCountry(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}
export default ShippingScreen