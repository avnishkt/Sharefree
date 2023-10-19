const express = require('express');
const router = express.Router();
const person =require('../model/person')
const check =require('../utils/jwt')
const {createPerson,loginUser,getuser} =require('../controller/user')

router.post('/createuser',createPerson);
router.post('/login',loginUser);
router.get('/g',check,getuser);


module.exports= router;
