import AsyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc     Fetch all products
// @route    GET /api/products
// @access   Public
const getProducts = AsyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

// @desc     Fetch single product
// @route    GET /api/products/:id
// @access   Public
const getProductById = AsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc     Delete a product
// @route    DELETE /api/products/:id
// @access   Private / Protected / Admin
const deleteProductByAdmin = AsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ message: 'Product removed' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc     Create a product
// @route    POST /api/products
// @access   Private / Protected / Admin
const createProductByAdmin = AsyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description'
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// @desc     Update a product
// @route    PUT /api/products/:id
// @access   Private / Protected / Admin
const updateProductByAdmin = AsyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc     Create new review
// @route    POST /api/products/:id/reviews
// @access   Private
const createProductReview = AsyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)
    
    if (product) {
        const alreadyReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment,
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export {
    getProducts,
    getProductById,
    deleteProductByAdmin,
    createProductByAdmin,
    updateProductByAdmin,
    createProductReview
}