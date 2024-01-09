const express = require('express');
const router2 = express.Router();
const {uploadFile}=require('../controller/file');
const auth =require('../config/auth')
const check =require('../utils/jwt')



router2.post('/files',auth,uploadFile);

module.exports= router2;


