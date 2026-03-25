import categorySchema from "../model/categorySchema.js";

const getCatByName = async (req, res) => {
  const { catName } = req.params;
  try {
    const getCat = await categorySchema
      .find({ categoryName: catName })
      .populate("games");
    if (!getCat) {
      return res.status(400).json({ message: "The Category not found!" });
    }
    res.status(201).json(getCat);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
export default getCatByName;
