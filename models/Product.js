const mongoose = require('mongoose');
const {Schema} = mongoose

const productSchema = new Schema({
    name: String,
    price:Number,
    description:String,
    imageUrl:String
})
module.exports =  mongoose.model('Product', productSchema)