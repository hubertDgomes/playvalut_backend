import userSchema from "../model/userSchema.js";
import bcrypt from "bcrypt";
const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await userSchema.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "No user found!" });
  }
  const isPassValid = await bcrypt.compare(password, user.password);
  if (!isPassValid) {
    return res.status(404).json({ message: "Invalid password!" });
  }
  ((req.session.isLoged = true), (req.session.userId = user._id));
  req.session.user = {
    fullName: user.fullName,
    email: user.email,
  };
  res.status(200).json({
    message: "Login Successfull!",
    user: req.session.user,
  });
};

export default loginController;
