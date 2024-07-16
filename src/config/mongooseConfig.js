import mongoose from 'mongoose'
import dotenv from 'dotenv' ;
dotenv.config();

const Url = process.env.DB_URL;

export const connectUsingMongoose = async ()=>{
   try{await  mongoose.connect(Url)
    console.log("connected using mongoose")
}catch(err){
       console.log(err)
       console.log("failed to connect using mongoose")
     
}
}