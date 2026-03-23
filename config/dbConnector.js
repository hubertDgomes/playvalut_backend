import mongoose from "mongoose";
import "dotenv/config"

const dbConnector = () => {
    try{
        mongoose.connect(`${process.env.MONGO}`)
    .then(()=> console.log("MongoDB has been connected"));
    }
    catch(err){
        console.log(err);
    }
}

export default dbConnector