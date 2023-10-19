const express =require('express');
const router4 =express.Router();
const {downloadFolder} =require('../controller/file')
router4.get('/:uuid',downloadFolder)

module.exports =router4;