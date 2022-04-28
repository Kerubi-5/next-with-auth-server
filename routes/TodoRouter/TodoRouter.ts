import express from "express";
const router = express.Router();
import { TodoController } from "../../controllers";
import { verifyToken } from "../../middlewares";

router.route("/").get(TodoController.index).post(TodoController.store);

router
  .route("/:id")
  .get(verifyToken, TodoController.show)
  .put(verifyToken, TodoController.update)
  .delete(verifyToken, TodoController.destroy);

export default router;
