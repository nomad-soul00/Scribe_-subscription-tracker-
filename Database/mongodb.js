import mongoose  from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if(!DB_URI){
    throw new Error('PLease define the mongodb uri environment variable inside .env.production / .env.development.local');
}

const connectToDatabases = async() =>{
    try{
        await mongoose.connect(DB_URI);
        console.log(`Connected to Databses in ${NODE_ENV} mode`);
    }catch(error){
        console.error("Error connecting Database: ", error);
        process.exit(1);
    }
}

export default connectToDatabases;