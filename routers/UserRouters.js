const express = require('express');
const router = express.Router();

const controller = require('../controller/UserController.js');
const verifyToken = require('../jwt-auth/Auth.js'); 

router.get('/users', verifyToken, controller.getUsers);          
router.post('/createuser', verifyToken, controller.addUser);      
router.put('/updateuser', verifyToken, controller.updateUser);   
router.delete('/deleteuser', verifyToken, controller.deleteUser);

module.exports = router;
