import gameSchema from "../model/gameSchema.js";

const getGameById = async (req, res) => {
  const { id } = req.params;
  try {
    const getGame = await gameSchema.findOne({ _id: id });
    res.status(201).json(getGame);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export default getGameById;
