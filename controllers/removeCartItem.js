import userSchema from "../model/userSchema.js";

const removeCartItem = async (req, res) => {
  try {
    if (!req.session.isLoged) {
      return res.status(401).json({ message: "Login first" });
    }

    const { id } = req.params;
    const userId = req.session.userId;

    const getUser = await userSchema.findById(userId);
    if (!getUser) {
      return res.status(404).json({ message: "The user is not existed" });
    }

    const result = await userSchema.updateOne(
      { _id: userId },
      {
        $pull: { cartGames: { games: id } }
      },
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    return res.status(200).json({ message: "Item removed successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export default removeCartItem;
