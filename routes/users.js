const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User')
const {user} = require('../controller/user')
const catchAsync = require('../utils/catchAsync')
router.route('/register')
    .post(catchAsync(user.registerUser))
router.route('/login')
    .post(passport.authenticate('local',{failureMessage:true}),user.sendCredentials)
router.get('/logout', (req,res)=>{
    req.logout((err)=>{
        if(err){return res.json({err})}
        res.json({islogin:false})
    });
})
router.get('/auth/checkLogin', (req,res)=>{
    console.log(req.user)
     if(req.user){
        return res.json({isLogin: true, user:{id:req.user._id, username:req.user.username}})
     }
     return res.json({isLogin:false})
})

    
module.exports = router