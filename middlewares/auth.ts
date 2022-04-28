import { Middleware } from "../common/commons";
import { verify } from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

console.log(secret);

const verifyToken: Middleware = async (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers.authorization ||
    req.headers["x-access-token"];

  if (!token) {
    return res
      .status(403)
      .json({ message: "A token is required for authentication" });
  }

  try {
    const decoded = verify(token, secret);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
};

export default verifyToken;
