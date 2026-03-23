import mongoose from "mongoose";
import { Schema } from "mongoose";

const categorySchema = new Schema({
    categoryName : {
        type : String,
    },
    games : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "games"
        }
    ]
})

export default mongoose.model("category", categorySchema);