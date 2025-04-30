const  mongoose =  require('mongoose');
const AutoIncrement  =  require('mongoose-sequence')(mongoose);

const schema =  mongoose.Schema ; 


const petTypeSchema =  new schema(
    {
    id: Number , 
    name :  {type : String  , required : true  ,  unique : true } 

});

petTypeSchema.plugin(AutoIncrement ,  {int_feild : "id "}) ; 
