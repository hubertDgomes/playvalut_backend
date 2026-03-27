import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartGames: [
    {
      games: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "games",
      },
    },
  ],
  buyGames: [
    {
      games: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "games",
      },
    },
  ],
});

export default mongoose.model("userdatas", userSchema);
