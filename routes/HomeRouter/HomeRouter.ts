import express from "express";
const router = express.Router();
import { HomeController } from "../../controllers";

router.route("/").get(HomeController.index).post(HomeController.store);

router
  .route("/:id")
  .get(HomeController.show)
  .put(HomeController.update)
  .delete(HomeController.destroy);

export default router;
