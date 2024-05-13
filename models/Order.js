const mongoose = require('mongoose');
const {Schema} = mongoose

const orderItemSchema = new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:'Product'
    },
    quantity:{
        type:Number,
        required:true
    }
})
const orderSchema = new Schema({
    buyer:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    orders:[orderItemSchema],
    isCompleted:{
        type:Boolean,
        required:true
    }
})
module.exports = mongoose.model('Order', orderSchema)