import gameSchema from "../model/gameSchema.js"

const getAllGame = async (req , res) => {
    try{
        const getGames = await gameSchema.find()
    res.status(201).json(getGames)
    }
    catch(err){
        return res.status(400).json({message : err.message})
    }
}

export default getAllGame