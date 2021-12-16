import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

const authenticateUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let token = request.headers.authorization;

  if (!token) {
    return response.status(401).json({ message: "Invalid token" });
  }

  token = token.split(" ")[1];

  try {
    verify(token, "a_great_secret_key");

    return next();
  } catch (error) {
    return response.status(401).json({ message: "Unauthorized" });
  }
};

export default authenticateUser;
