const express = require('express');
const router = express.Router();
const person =require('../model/person')
const check =require('../utils/jwt')
const {createPerson,loginUser,getuser,logout} =require('../controller/user')

router.post('/createuser',createPerson);
router.post('/login',loginUser);
router.post('/logout',logout);
router.get('/dashboard',getuser);


module.exports= router;
