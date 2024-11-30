const express = require('express');
const router = express.Router();
const {getUsers,register}=require('../controllers/usersController');

router.post('/register',register)
router.get('/allUsers',getUsers)

module.exports=router