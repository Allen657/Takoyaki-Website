if(process.env.NODE_ENV !=='production'){
    require('dotenv').config();
}

const methodOverride = require('method-override');
const mongoose = require('mongoose');
const express = require('express');
const orderRoute = require('./routes/orders');
const productRoute = require('./routes/products');
const userRoute = require('./routes/users')
const app = express();
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');
const User = require('./models/User');
const cors = require('cors');
const secret = process.env.SECRET;
const mongoDBURL = process.env.MONGODB_URL
const mongoStore = require('connect-mongo');
const store = mongoStore.create({
    mongoUrl: mongoDBURL,
    touchAfter: 24 * 60 * 60,
    crypto:{
        secret
    }
})

mongoose.connect(mongoDBURL)
.then(()=>console.log('db Connected'));


const sessionConfig = {
    store,
    name:'sessions',
    secret,
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure:true,
        sameSite:'none'
    }
}
//middlewares
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(cors({
    origin:'https://takoyaki-1.onrender.com',
    credentials:true
}))
app.set('trust proxy',1)
app.use(session(sessionConfig))
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//routes
app.use('/orders', orderRoute);
app.use('/products', productRoute)
app.use('/', userRoute)

//passportJs


app.get('/', (req,res)=>{
    res.send('takoyakoi')
})
//error handlers
app.all('*',(req,res,next)=>{
    throw new expressError('Page Not Found',404);
});
//when an error is thrown within inside the routes, this middleware catches it
app.use((err,req,res,next)=>{
    const {status = 500} = err;
    if(!err.message)err.message = 'An Error occured';
    res.status(status).json({error:'error',err});
});
app.listen(3000,()=>{
console.log('listening')
})