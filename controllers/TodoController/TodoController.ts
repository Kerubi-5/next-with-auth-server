import { ControllerCRUD } from "../../common/controller-crud";
import { Todo } from "../../models";
import type { ExceptionError } from "../../common/errors";

const TodoController: ControllerCRUD = {
  index: async (req, res) => {
    try {
      const todo = await Todo.find();

      return res.json({
        data: todo,
        message: "Succesfully get all Todo items",
      });
    } catch (err: ExceptionError) {
      const errorMessage = err.message || "Cannot get all Todo items";
      return res
        .status(err.status || 500)
        .json({ data: null, message: errorMessage });
    }
  },
  store: async (req, res) => {
    const { title, description } = req.body;
    try {
      if (!title || !description) {
        throw new Error("title or description is missing");
      }

      const todo = await Todo.create({ title, description });
      return res
        .status(201)
        .json({ data: todo, message: "Todo created successfully" });
    } catch (err: ExceptionError) {
      const errorMessage = err.message ?? "Error in creating data";
      return res.status(400).json({ data: null, message: errorMessage });
    }
  },
  show: async (req, res) => {
    const id = req.params.id;

    try {
      const todo = await Todo.findById(id);

      return res.json({ data: todo, message: "Succesfully get Todo item" });
    } catch (err: ExceptionError) {
      const errorMessage = err.message ?? "Error in getting Todo data";
      return res.status(400).json({ data: null, message: errorMessage });
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    req.body.updatedAt = Date.now();
    try {
      const todo = await Todo.findByIdAndUpdate(
        { _id: id },
        { $set: req.body },
        { new: true }
      );

      return res
        .status(200)
        .json({ data: todo, message: "Successfully updated" });
    } catch (error: ExceptionError) {
      const errorMessage = error.message ?? "Error in updating data";
      return res.status(400).json({ data: null, message: errorMessage });
    }
  },
  destroy: async (req, res) => {
    const id = req.params.id;

    try {
      const todo = await Todo.findByIdAndDelete({ _id: id });

      return res
        .status(200)
        .json({ data: todo, message: "Successfully deleted" });
    } catch (err: ExceptionError) {
      const errorMessage = err.message ?? "Error in deleting data";
      return res.status(400).json({ data: null, message: errorMessage });
    }
  },
};

export default TodoController;
