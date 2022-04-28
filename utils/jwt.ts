import { sign } from "jsonwebtoken";

interface IPayload {
  email: string;
}

const options = {
  expiresIn: "1h", // expires in 1 hour
};

// GET FROM ENV SECURED SECRET
const secret = "secret";

const generateToken = async (payload: IPayload) => {
  return sign(payload, secret, options);
};

export default generateToken;
