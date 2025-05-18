const express = require('express');
const router = express.Router();

const controller = require('../controller/UserController.js');
const verifyToken = require('../jwt-auth/Auth.js'); 


const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); 

router.get('/users', verifyToken, controller.getUsers);          
router.post('/createuser', verifyToken, controller.addUser);      
router.put('/updateuser', verifyToken, controller.updateUser);   
router.delete('/deleteuser', verifyToken, controller.deleteUser);

router.post("/Profileimage/:id", verifyToken, upload.single("image"), controller.uploadImageForProfile);
router.get("/Profileimage/:id", verifyToken, controller.getProfileImage);


router.post("/Coverimage/:id", verifyToken, upload.single("image"), controller.uploadImageForCover);
router.get("/Coverimage/:id", verifyToken, controller.getCoverImage);




module.exports = router;
