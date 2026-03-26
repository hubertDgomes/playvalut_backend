import gameSchema from "../model/gameSchema.js";
import userSchema from "../model/userSchema.js";

const addToCart = async (req, res) => {
  if (!req.session.isLoged) {
    return res.status(400).json({ message: "Login first" });
  }
  const { id } = req.params;
  const getGames = await gameSchema.findOne({ _id: id });
  try {
    if (!getGames) {
      return res.status(400).json({ message: "Game not found!" });
    }
    const checkGame = await userSchema.findOne({
      _id: req.session.userId,
      "cartGames.games": getGames._id,
    });
    if (checkGame) {
      return res.status(400).json({ message: "Game already added to cart!" });
    }
    const getUserGames = await userSchema.findByIdAndUpdate(
      req.session.userId,
      {
        $push: { cartGames: { games: getGames._id } },
      },
      { new: true },
    );
    res.status(200).json({ message: "Game added to cart!" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export default addToCart;
