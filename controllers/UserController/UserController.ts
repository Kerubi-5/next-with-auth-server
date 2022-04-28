import { ControllerCRUD } from "../../common/controller-crud";
import { User } from "models";
import type { Error } from "common/errors";

const UserController: ControllerCRUD = {
  index: async (req, res) => {
    try {
      const users = await User.find();
      return res.json({ data: users, message: "Success" });
    } catch (err) {}
  },
  show: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findById({ _id: id });
      return res.json({ data: user, message: "Success" });
    } catch (err) {}
  },
  store: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      if (!name || !email || !password) {
        throw new Error("name, email or password is missing");
      }
      const user = await User.create({ name, email, password });
      return res.json({ data: user, message: "Success" });
    } catch (err: Error) {
      const errorMessage = err.message ?? "Error in creating data";
      return res.status(400).json({ data: null, message: errorMessage });
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
