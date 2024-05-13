const express = require('express')
const router = express.Router();
const {order} = require('../controller/order')
const catchAsync = require('../utils/catchAsync')
const {isLoggedIn} = require('../middleware')

router.post('/',catchAsync(order.userOrder))//post an order based on the userId
router.get('/:userId',catchAsync(order.getOrders))
router.route('/:orderId')
    .delete(catchAsync(order.deleteOrder))
    .patch(catchAsync(order.recieveOrder))

module.exports = router