import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js' // all the users 
import products from './data/products.js' // dummy products
import User from './models/userModel.js' // database model
import Product from './models/productModel.js' // database model
import Order from './models/orderModel.js' // database model
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        const createdUser = await User.insertMany(users)
        const adminUser = createdUser[0]._id
        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        })
        await Product.insertMany(sampleProducts)
        console.log('Data Imported!'.green.inverse)
        process.exit()
    } catch (err) {
        console.error(`${err}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        console.log('Data Destroyed!'.red.inverse)
        process.exit()
    } catch (err) {
        console.error(`${err}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}