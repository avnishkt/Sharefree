const express =require('express');
const router3 =express.Router();
const {download,sendFile} =require('../controller/file')
router3.get('/:uuid',download)
router3.post('/send',sendFile)


module.exports =router3;
