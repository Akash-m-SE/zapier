import bcrypt from "bcryptjs";

const isPasswordCorrect = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

  return isPasswordCorrect;
};

const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
};

export { isPasswordCorrect, hashPassword };
