import express from "express";
import addCategoryController from "../controllers/addCategoryController.js";
import addGameToCategory from "../controllers/addGameToCategory.js";
import multer from "multer";
import getAllCategory from "../controllers/getAllCategory.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

router.post("/addcategory", addCategoryController);
router.post(
  "/addgames",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  addGameToCategory,
);
router.get("/getcategory" , getAllCategory)

export default router;
