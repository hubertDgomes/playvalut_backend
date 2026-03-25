import categorySchema from "../model/categorySchema.js";
import gameSchema from "../model/gameSchema.js";
import imageUpload from "../middleware/cloudinaryMiddleware.js";

const addGameToCategory = async (req, res) => {
  const {
    title,
    price,
    platform,
    shortDescription,
    fullDescription,
    discountPercentage,
    trailerUrl,
    systemRequirements,
    releaseDate,
    developer,
    publisher,
    catName,
    isNewRel,
  } = req.body;

  if (!title || !price || !platform || !catName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const getLogo = await imageUpload(req.files.logo[0].path);
    const getCoverImage = await imageUpload(req.files.coverImage[0].path);

    const logo = getLogo.secure_url;
    const coverImage = getCoverImage.secure_url;

    
    const categoryCheck = await categorySchema.findOne({
      categoryName: catName,
    });
    if (!categoryCheck) {
      return res.status(400).json({ message: "The category not found!" });
    }

    const checkGames = await gameSchema.findOne({ title: title });
    if (checkGames) {
      return res
        .status(400)
        .json({ message: "The game already has been shortlisted!" });
    }

    const newGame = new gameSchema({
      title,
      price,
      platform,
      shortDescription,
      fullDescription,
      discountPercentage,
      trailerUrl,
      systemRequirements: JSON.parse(systemRequirements),
      releaseDate,
      developer,
      logo,
      coverImage,
      publisher,
      isNewRel,
      catName
    });

    await newGame.save();

    categoryCheck.games.push(newGame._id);
    await categoryCheck.save();

    res.status(201).json({ message: "The game has been submited" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export default addGameToCategory;
