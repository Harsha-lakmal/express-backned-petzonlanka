const app = require("./app");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const router =  require('./router');
const port  =  3001 ; 
const host  = "localhost"

app.use(cors());

app.use(express.json());

const uri  = 'mongodb+srv://Harsha:Harsha123@cluster.wxfmho6.mongodb.net/petZonLakna?retryWrites=true&w=majority&appName=Harsha';

const  connect  =  async () =>{

    try {

        await  mongoose.connect(uri);
        console.log("connect to Databaase ");
        
    }catch(error){
        console.log("error : "+error);
        

    }

}

connect();

const server = app.listen( port , host, () => {
  console.log(`node server is listening to ${server.address().port}`);
});


app.use('/api' ,  router)