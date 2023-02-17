import { Router } from "express";
import user from "./user";

// Middlewares
import secretKey from "@/middlewares/secretKey";

export default () => {
  const app = Router();
  app.use(secretKey);

  user(app);

  return app;
};
