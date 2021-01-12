import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword // query string
    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()
    const { loading, error, products } = useSelector(state => state.productList)

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            {!keyword && <ProductCarousel />}
            <h1>Latest Products</h1>
            {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (
                <>
                    <Row>
                        {products.map(product => (
                            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                </>
            )}
        </>
    )
}

HomeScreen.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.object,
    products: PropTypes.array,
}

export default HomeScreen
