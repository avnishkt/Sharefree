const express = require('express');
const router2 = express.Router();
const {uploadFile}=require('../controller/file');


router2.post('/files',uploadFile);

module.exports= router2;


