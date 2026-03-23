import categorySchema from "../model/categorySchema.js";

const addCategoryController = async (req, res) => {
  const { categoryName } = req.body;
  if (!categoryName) {
      return res.status(400).json({ message: "Please write the name" });
    }
    
    try { 
    const categoryCheck = await categorySchema.findOne({
      categoryName: categoryName,
    });
    if (categoryCheck) {
      return res
        .status(400)
        .json({ message: "This category is already exist." });
    }

    const newCat = categorySchema({
      categoryName,
    });
    await newCat.save();
    res.json({ message: "The category has been created!" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export default addCategoryController;
