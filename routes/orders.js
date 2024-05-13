const express = require('express')
const router = express.Router();
const {order} = require('../controller/order')
const catchAsync = require('../utils/catchAsync')
const {isLoggedIn} = require('../middleware')

router.post('/',isLoggedIn,catchAsync(order.userOrder))//post an order based on the userId
router.get('/:userId',isLoggedIn,catchAsync(order.getOrders))
router.route('/:orderId')
    .delete(isLoggedIn,catchAsync(order.deleteOrder))
    .patch(isLoggedIn,catchAsync(order.recieveOrder))

module.exports = router