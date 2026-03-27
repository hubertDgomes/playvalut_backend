import userSchema from "../model/userSchema.js"

const getLibrary = async (req , res) => {
    if(!req.session.isLoged){
        return res.status(400).json({message : "Login first"})
    }
    const getLib = await userSchema.findOne({_id : req.session.userId}).select("buyGames").populate("buyGames.games")
    res.json(getLib)
}

export default getLibrary