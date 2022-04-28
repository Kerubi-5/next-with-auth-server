import express, { Application } from "express";
import cors from "cors";
import "dotenv/config";
import { AuthRouter, TodoRouter } from "./routes";
import db from "./config/db";
import cookieParser from "cookie-parser";

const main = async () => {
  const app: Application = express();

  /**
   *
   * ENV VARIABLES
   *
   */

  const PORT = process.env.PORT || 8080;
  const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/";
  const COOKIE_SECRET = process.env.COOKIE_SECRET || "";

  /**
   *
   * MONGODB CONFIGURATION
   *
   */

  const mongoProps = {
    mongo_url: MONGODB_URL,
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
  app.use(cookieParser(COOKIE_SECRET));

  /**
   *
   * EXPRESS ROUTES
   *
   */

  app.use("/api", TodoRouter);
  app.use("/api/auth", AuthRouter);

  app.listen(PORT, () => console.log(`Server started at port:${PORT}`));
};

main().catch((err) => console.log(err));
