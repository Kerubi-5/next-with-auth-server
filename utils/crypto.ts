import { createHmac } from "crypto";

const hashPassword = (password: string, salt: string): string => {
  const hash = createHmac("sha512", salt).update(password).digest("hex");
  return hash;
};

export default hashPassword;
