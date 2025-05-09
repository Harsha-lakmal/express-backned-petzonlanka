const express = require("express");
const router = express.Router();

const controller = require("../controller/VlogController.js");
const verifyToken = require("../jwt-auth/Auth.js");

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); 

router.get("/getVlogs", verifyToken, controller.getVlogs);
router.post("/addVlog", verifyToken, controller.addVlog);
router.put("/updateVlog", verifyToken, controller.updateVlog);
router.delete("/deleteVlog", verifyToken, controller.deleteVlog);
router.post('/image/:petId', verifyToken, upload.single('image'), controller.uploadImage);
router.get('/image/:petId',verifyToken , controller.getImage);

module.exports = router;
