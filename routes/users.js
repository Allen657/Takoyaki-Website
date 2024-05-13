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
router.get('/logout', user.logout)
router.get('/auth/checkLogin', user.checkLogin)

    
module.exports = router