import { User } from "../../models/user.model";
import { generateToken } from "../../utils/jwt";

export const registerUser = async (payload: any) => {
  const user = await User.create(payload);

  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  return { user, token };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  return { user, token };
};
