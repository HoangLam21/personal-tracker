import User from "@/database/user.model";
import { connectToDatabase } from "../mongodb";
import { comparePassword } from "../hash";

export async function signInAction(email: string, password: string) {
  await connectToDatabase();
  const user = await User.findOne({
    $or: [{ email }, { phoneNumber: email }],
  });
  const isValid = await comparePassword(password, user.passwordHash);
  if (isValid) {
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  } else {
    return null;
  }
}
