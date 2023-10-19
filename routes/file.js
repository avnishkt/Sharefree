const express = require('express');
const router2 = express.Router();
const {uploadFile}=require('../controller/file');


router2.post('/upload',uploadFile);

module.exports= router2;


