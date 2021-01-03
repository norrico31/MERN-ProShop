import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct } from '../actions/productActions'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const dispatch = useDispatch()
    const { loading, error, product } = useSelector(({productDetails}) => productDetails)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector(({productUpdate}) => productUpdate)
    
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        }else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setDescription(product.description)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
            }
        }
        
    }, [productId, product, dispatch, history, successUpdate])

    const onSubmitHandler = e => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            description,
            category,
            countInStock
        }))
    }
    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {loading ? (<Loader />) : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={onSubmitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId='price'>
                            <Form.Label>Price Address</Form.Label>
                            <Form.Control type="number" placeholder="Enter Price" value={price} onChange={e => setPrice(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type="text" placeholder="Enter Brand" value={brand} onChange={e => setBrand(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId='image'>
                            <Form.Check type="text" placeholder="Enter image url" value={image} onChange={e => setImage(e.target.checked)} />
                        </Form.Group>
                        <Form.Group controlId='countInStock'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control type="number" placeholder="Enter Count in stock" value={countInStock} onChange={e => setCountInStock(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" placeholder="Enter Category" value={category} onChange={e => setCategory(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter Description" value={description} onChange={e => setDescription(e.target.value)} />
                        </Form.Group>
                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}
export default ProductEditScreen