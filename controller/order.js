const Order = require('../models/Order');
const User = require('../models/User');
module.exports.order = {
    userOrder:async (req, res) => {
        const order = new Order({
            ...req.body.order,
            orders:[...req.body.order.order]
        });
        order.isCompleted=false;
        order.save()
        res.json({ success: true })
    },
    getOrders:async(req,res)=>{
        const orders = await Order.find({buyer:req.params.userId})
            .populate('buyer','name')
            .populate({path:'orders.product',select:'name price'})
        console.log(orders)
        res.json({orders})
    },
    deleteOrder:async(req,res)=>{
        const{orderId} = req.params;
        const order = await Order.findByIdAndDelete(orderId);
        res.json({message:'Deleted Successfully'})
    },
    recieveOrder:async(req,res)=>{
        const{orderId} = req.params;
        const order = await Order.findByIdAndUpdate(orderId,{isCompleted:true});
        res.json({message:'recieved successfully'})
    }
}