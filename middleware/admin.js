const verifyRole = (req, res, next) => {
  const { user } = req;
  if (user && user.role === "Admin") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = verifyRole;
