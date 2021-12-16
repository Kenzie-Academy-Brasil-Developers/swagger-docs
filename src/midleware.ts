import { NextFunction, Request, Response } from "express";

export async function isAuthenticated(
  request: Request,
  response: Response,
  nextFunction: NextFunction
) {
  const token = request.headers.authorization;

  if (!token) {
    return response.status(401).send();
  }
  const [, user] = token.split(" ");

  if (user === "admin") {
    return nextFunction();
  }
  return response.status(401).send();
}
