import { createHmac } from "crypto";

const hashPassword = async (
  password: string,
  salt: string
): Promise<string> => {
  const hash = createHmac("sha512", salt).update(password).digest("hex");
  return hash;
};

export default hashPassword;
