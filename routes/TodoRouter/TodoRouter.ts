import express from "express";
const router = express.Router();
import { TodoController } from "../../controllers";

router.route("/").get(TodoController.index).post(TodoController.store);

router
  .route("/:id")
  .get(TodoController.show)
  .put(TodoController.update)
  .delete(TodoController.destroy);

export default router;
