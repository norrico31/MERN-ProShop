import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductListScreen = ({ match, history }) => {
    const dispatch = useDispatch()
    const { loading, products, error } = useSelector(state => state.productList)
    const { userInfo } = useSelector(({userLogin}) => userLogin)
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = useSelector(({productDelete}) => productDelete)
    const { loading: loadingCreate, success: successCreate, error: errorCreate, product: createdProduct } = useSelector(({productCreate}) => productCreate)

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        }
        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts())
        }
    }, [dispatch, userInfo, history, successDelete, successCreate, createdProduct])

    const onCreateProductHandler = product => {
        dispatch(createProduct())
    }
    const onDeleteHandler = productId => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteProduct(productId))
        }
    }
    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={onCreateProductHandler}><i className="fas fa-plus" /> Create Product</Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? (<Loader />) : error ? (<Message variant="danger">{error}</Message>) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>Brand</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>$ {product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className="btn-sm"><i className="fas fa-edit" /></Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => onDeleteHandler(product._id)}><i className="fas fa-trash"/></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}
export default ProductListScreen