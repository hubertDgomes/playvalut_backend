import gameSchema from "../model/gameSchema.js";

const getAllNewGames = async (req, res) => {
  try {
    const allGames = await gameSchema.find({isNewRel : true});
    res.status(201).json(allGames);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export default getAllNewGames;
