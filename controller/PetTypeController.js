const PetType  = require('../model/PetNameType.js');


const addPetType  = async (req , res , next ) =>{

    try {

        const {name}  =  req.body ; 

    if (!name ){
        return res.status(400).json({
            error : "Name field Not & Trg again "
        }) ; 
    }

    const exitinPetType  = await PetType.findOne({
        $or : [{name}]
    });

    if(exitinPetType){

        return res.status(400).json({
            error : "name is alredy in use "
        });

    }

    const newPetType  = new PetType({name});
    await newPetType.save();

    res.status(201).json({
        message : "Pet Type is Saved " ,  
        petType : newPetType 
    });

    }catch(error){
        res.status(500).json({
            error : "pet is not saved & Try Again "
        });

    }

}; 



exports.addPetType =  addPetType ; 