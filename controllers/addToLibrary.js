import userSchema from "../model/userSchema.js";

const addToLibrary = async (req, res) => {
  if (!req.session.isLoged) {
    return res.status(400).json({ message: "Login first!" });
  }
  try {
    const getCart = await userSchema.findOne({ _id: req.session.userId });
    const getUserGames = await userSchema
      .findOne({ _id: req.session.userId })
      .select("cartGames");
    const addLib = await userSchema.findByIdAndUpdate(req.session.userId, {
      $push: { buyGames: getUserGames.cartGames },
    });
    getCart.cartGames = [];
    await getCart.save();
    res.json({ message: "Games added to library!" });
  } catch (err) {
    return res.status(400).json({ message: "Internal server error!" });
  }
};

export default addToLibrary;
