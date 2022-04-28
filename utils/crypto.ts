import { createHmac } from "crypto";

const salt = process.env.CRYPTO_SECRET;

const hashPassword = async (password: string): Promise<string> => {
  const hash = createHmac("sha512", salt).update(password).digest("hex");
  return hash;
};

export default hashPassword;
