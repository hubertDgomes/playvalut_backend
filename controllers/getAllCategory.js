import categorySchema from "../model/categorySchema.js";

const getAllCategory = async (req, res) => {
  try {
    const getCat = await categorySchema.find().select("-_id -games");
    res.status(201).json(getCat);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
export default getAllCategory;
