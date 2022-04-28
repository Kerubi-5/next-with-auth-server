import { ControllerUSER } from "../../common/controller-crud";
import { User } from "models";
import type { Error } from "common/errors";

const UserController: ControllerUSER = {
  index: async (req, res) => {
    try {
      const users = await User.find();
      return res.json({ data: users, message: "Success" });
    } catch (err) {}
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Password is incorrect" });
      }
      const token = await user.generateToken();
      return res.json({ data: { token, user }, message: "Success" });
    } catch (err) {}
  },
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      const newUser = await User.create({ email, password });
      const token = await newUser.generateToken();
      return res.json({ data: { token, user: newUser }, message: "Success" });
    } catch (err) {}
  },
  show: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findById({ _id: id });
      return res.json({ data: user, message: "Success" });
    } catch (err) {}
  },
  update: async (req, res) => {
    const id = req.params.id;
    req.body.updatedAt = Date.now();
    try {
      const user = await User.findByIdAndUpdate(
        { _id: id },
        { $set: req.body },
        { new: true }
      );
      return res.json({ data: user, message: "Success" });
    } catch (err: Error) {
      const errorMessage = err.message ?? "Error in updating data";
      return res.status(400).json({ data: null, message: errorMessage });
    }
  },
  destroy: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findByIdAndDelete({ _id: id });
      return res.json({ data: user, message: "Success" });
    } catch (err: Error) {
      const errorMessage = err.message ?? "Error in deleting data";
      return res.status(400).json({ data: null, message: errorMessage });
    }
  },
};

export default UserController;
