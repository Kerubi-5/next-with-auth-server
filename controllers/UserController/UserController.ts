import { ControllerUSER } from "../../common/commons";
import { User } from "../../models";
import type { ExceptionError } from "common/errors";
import { hashPassword, generateToken } from "../../utils";

const comparePassword = (inputPW: string, dbPW: string) => {
  if (inputPW !== dbPW) {
    return false;
  }

  return true;
};

const UserController: ControllerUSER = {
  index: async (req, res) => {
    try {
      const users = await User.find();
      return res.json({ data: users, message: "Success" });
    } catch (err: ExceptionError) {
      const errorMessage = err.message ?? "Error getting all users";
      return res.status(400).json({ data: null, error: errorMessage });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // FIND IF USER EXISTS
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // HASH PASSWORD AND COMPARE
      const hashedPW = await hashPassword(password);
      const isMatch = comparePassword(hashedPW, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // GENERATE JWT TOKEN
      const authToken = await generateToken({ email });

      return res.json({
        data: { token: authToken, user },
        message: "Success login",
      });
    } catch (err: ExceptionError) {
      const errorMessage = err.message ?? "Could not login";
      return res.status(400).json({ data: null, message: errorMessage });
    }
  },
  register: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      if (!email || !password) {
        return res.status(400).json({ message: "Missing credentials" });
      }

      const user = await User.findOne({ email });

      // CHECK IF USER EXISTS
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // HASH PASSWORD WITH CRYPTO LIB
      const hashedPassword = await hashPassword(password);

      // SAVE USER INTO DATABASE
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        data: { user: newUser },
        message: "Success registration",
      });
    } catch (err: ExceptionError) {
      const errorMessage = err.message ?? "Error in creating user";
      return res.status(400).json({ data: null, message: errorMessage });
    }
  },
  show: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findById({ _id: id });
      return res.json({ data: user, message: "Success" });
    } catch (err: ExceptionError) {
      const errorMessage = err.message ?? "Error getting user";
      return res.status(400).json({ data: null, error: errorMessage });
    }
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
    } catch (err: ExceptionError) {
      const errorMessage = err.message ?? "Error in updating data";
      return res.status(400).json({ data: null, message: errorMessage });
    }
  },
  destroy: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findByIdAndDelete({ _id: id });
      return res.json({ data: user, message: "Success" });
    } catch (err: ExceptionError) {
      const errorMessage = err.message ?? "Error in deleting data";
      return res.status(400).json({ data: null, message: errorMessage });
    }
  },
};

export default UserController;
