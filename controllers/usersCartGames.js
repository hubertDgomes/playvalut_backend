import userSchema from "../model/userSchema.js";

const usersCartGames = async (req, res) => {
  if (!req.session.isLoged) {
    return res.status(400).json({ message: "Login first" });
  }

  try {
    const getCart = await userSchema
      .findOne({ _id: req.session.userId })
      .select("cartGames")
      .populate("cartGames.games");
    if (!getCart) {
      return res.status(400).json({ message: "Users not found!" });
    }
    res.status(201).json(getCart);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export default usersCartGames;
