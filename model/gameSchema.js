  import mongoose from "mongoose";
  import { Schema } from "mongoose";

  const gameSchema = new Schema({
    title: String,  
    price: String,  
    platform: String, 
    shortDescription: String, 
    fullDescription: String,  
    discountPercentage: String, 
    logo : String,  
    coverImage: String, 
    trailerUrl: String,
    catName : String,
    isNewRel : {
      type : Boolean,
      default : false
    },
    systemRequirements: { 
      minimum: {  
        os: String, 
        processor: String,  
        memory: String, 
        graphics: String, 
        storage: String,  
      },  
      recommended: {  
        os: String, 
        processor: String,  
        memory: String, 
        graphics: String, 
        storage: String,  
      },  
    },  
    releaseDate: String,  
    developer: String,  
    publisher: String,  
  });

  export default mongoose.model("games", gameSchema);
