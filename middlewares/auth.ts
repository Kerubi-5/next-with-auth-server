import { Middleware } from "../common/commons";
import { verify } from "jsonwebtoken";
import { ExceptionError } from "../common/errors";

const secret = process.env.JWT_SECRET;

const verifyToken: Middleware = async (req, res, next) => {
  const token = req.signedCookies.authToken || req.headers.authorization;

  if (!token) {
    return res
      .status(403)
      .json({ message: "A token is required for authentication" });
  }

  try {
    const bearerToken = token.split(" ")[1];
    const decoded = verify(bearerToken, secret);

    req.user = decoded;
    next();
  } catch (error: ExceptionError) {
    return res.status(500).json({ message: error.message });
  }
};

export default verifyToken;
