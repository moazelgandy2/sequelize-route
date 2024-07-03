import User from "../../../db/model/user.model.js";
import * as bcrypt from "bcryptjs";

const addUser = async (req, res) => {
  const { userName, email, password } = req.body;
  const isUserExist = await User.findOne({ where: { email } });
  if (isUserExist) {
    return res.status(400).json({ message: "User already exist" });
  }
  const hashedPass = await bcrypt.hash(password, 8);

  const user = await User.create({
    userName,
    email,
    password: hashedPass,
  });

  res.status(201).json({ message: "User created successfully", user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  user.update({ loggedIn: true });
  res.status(200).json({ message: "User logged in successfully", user });
};

const logout = async (req, res) => {
  const { id } = req.body;
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (!user.loggedIn) {
    return res.status(400).json({ message: "User already logged out" });
  }
  user.update({ loggedIn: false });
  res.status(200).json({ message: "User logged out successfully", user });
};

export { addUser, login, logout };
