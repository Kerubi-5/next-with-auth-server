import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { TodoRouter } from "./routes";
import db from "./config/db";

const main = async () => {
  const app: Application = express();
  dotenv.config();

  /**
   *
   * ENV VARIABLES
   *
   */

  const port = process.env.PORT || 8080;
  const mongo_url = process.env.MONGODB_URL || "mongodb://localhost:27017/";

  /**
   *
   * MONGODB CONFIGURATION
   *
   */

  const mongoProps = {
    mongo_url,
  };

  db(mongoProps);

  /**
   *
   * EXPRESS MIDDLEWARES
   *
   */

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());

  /**
   *
   * EXPRESS ROUTES
   *
   */

  app.use("/api", TodoRouter);

  app.listen(port, () => console.log(`Server started at port:${port}`));
};

main().catch((err) => console.log(err));
