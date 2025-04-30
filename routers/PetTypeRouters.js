const  express  = require('express');
const  verifyToken  =  require('../jwt-auth/Auth.js');
const controller  =  require('../controller/PetTypeController.js');
const PetTyperouter  =  express.Router();

PetTyperouter.post('/createPetType' , verifyToken , controller.addPetType);
PetTyperouter.put('/updatePetTpye' , verifyToken , controller.updatePetType);
PetTyperouter.delete('/deletePetType' , verifyToken , controller.deletePetType);
PetTyperouter.get('/getAllPetType' , verifyToken , controller.getPetType);



module.exports = PetTyperouter ;  