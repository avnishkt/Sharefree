const express =require('express');
const router3 =express.Router();
const {download} =require('../controller/file')
router3.get('/:uuid',download)

module.exports =router3;
