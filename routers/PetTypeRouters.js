const  express  = require('express');
const  verifyToken  =  require('../jwt-auth/Auth.js');
const controller  =  require('../controller/PetTypeController.js');
const PetTyperouter  =  express.Router();

PetTyperouter.post('/createPetType' , verifyToken , controller.addPetType);

module.exports = PetTyperouter ;  