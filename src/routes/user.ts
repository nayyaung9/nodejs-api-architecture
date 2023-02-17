import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import AuthService from "@/services/auth.service";
import { Logger } from "winston";
import { IUserInputDTO } from "@/interfaces/IUser";
import { celebrate, Joi, Segments } from "celebrate";
const route = Router();

export default (app: Router) => {
  app.use("/users", route);
  const AuthServiceInstance = Container.get(AuthService);
  const logger: Logger = Container.get("logger");

  route.post(
    "/authenticate",
    celebrate({
      [Segments.BODY]: Joi.object({
        email: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await AuthServiceInstance.Authenticate(
          req.body as IUserInputDTO
        );
        return res.status(201).json({ success: true, data });
      } catch (err) {
        logger.error("Fetch Pets Error: %o", err);
        return next(err);
      }
    }
  );
};
