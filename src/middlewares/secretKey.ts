import config from "@/config";
import { NextFunction, Request, Response } from "express";

const secretToken = (req: Request, res: Response, next: NextFunction) => {
  const secret_key = req.headers["secret-key"];
  if (!secret_key)
    return res
      .status(403)
      .json({ success: false, data: "Secret key not found." });

  if (secret_key === config.jwtSecret) {
    next();
  } else {
    return res
      .status(403)
      .json({ success: false, data: "Invalid Secret Key." });
  }
};

export default secretToken;
