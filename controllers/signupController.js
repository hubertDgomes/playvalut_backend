import userSchema from "../model/userSchema.js";
import bcrypt from "bcrypt";

const signupController = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await userSchema.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        return res.status(500).json({ message: "Something went wrong" });
      }
      const newUser = new userSchema({
        fullName,
        email,
        password: hash,
      });
      await newUser.save();
      req.session.isLoged = true;
      req.session.userId = newUser._id;
      req.session.user = {
        fullName: newUser.fullName,
        email: newUser.email,
      };
      res.status(201).json({
        message: "User created successfully",
        user: req.session.user,
      });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export default signupController;
