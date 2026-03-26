const logoutController = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      return res.status(400).json({ message: "Logout failed" });
    }
    res.status(201).json({ message: "Logout successfully!" });
  });
};
export default logoutController
