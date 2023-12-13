import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyToken = (req, res, next) => {
  const accessToken = req.cookies.token || req.headers["x-access-token"];

  if (!accessToken) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ msg: err.message });
    }
    next();
  });
};

export default verifyToken;
