import express from "express";
import addCategoryController from "../controllers/addCategoryController.js";
import addGameToCategory from "../controllers/addGameToCategory.js";
import multer from "multer";
import getAllCategory from "../controllers/getAllCategory.js";
import getAllNewGames from "../controllers/getAllNewGames.js";
import getAllGame from "../controllers/getAllGame.js";
import getGameById from "../controllers/getGameById.js";
import getCatByName from "../controllers/getCatByName.js";
import signupController from "../controllers/signupController.js";
import loginController from "../controllers/loginController.js";
import dashboardMiddleware from "../middleware/dashboardMiddleware.js";
import dashboard from "../controllers/dashboard.js";
import logoutController from "../controllers/logoutController.js";
import addToCart from "../controllers/addToCart.js";
import usersCartGames from "../controllers/usersCartGames.js";
import removeCartItem from "../controllers/removeCartItem.js";
import addToLibrary from "../controllers/addToLibrary.js";
import getLibrary from "../controllers/getLibrary.js";

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
router.get("/getcategorybyname/:catName" , getCatByName)
router.get("/getallnewgames" , getAllNewGames)
router.get("/getallgames" , getAllGame)
router.get("/getgamebyid/:id" , getGameById)
router.post("/signup" , signupController)
router.post("/login" , loginController)
router.post("/logout" , logoutController)
router.get("/dashboard" , dashboardMiddleware , dashboard)
router.post("/addgames/:id" , addToCart)
router.get("/showcart" , usersCartGames)
router.delete("/deletecart/:id" , removeCartItem)
router.post("/addtolib" , addToLibrary)
router.get("/getlibrary" , getLibrary)

export default router;
