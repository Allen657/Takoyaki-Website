const express = require('express')
const router = express.Router();
const Product = require('../models/Product');
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn} = require('../middleware')
router.route('/')
    .get(catchAsync(async (req, res) => {
        const product = await Product.find({})
        res.json({ product });
    }))
    //data seeder
    .post(isLoggedIn,async (req, res) => {
        const product = new Product({
            name: 'Crab and Cheese',
            price: 60,
            description: 'Indulge in the delicious taste of crab combined with creamy cheese in these delectable Takoyaki balls. The savory crab filling perfectly complements the melted cheese, delivering a rich and satisfying flavor experience.',
            imageUrl: 'https://res.cloudinary.com/dduiomi6y/image/upload/v1715422086/Octopus-Balls-thumbnail_rykncp.jpg'
        })
        const resss = await product.save();
        res.send('success')
    })
module.exports = router