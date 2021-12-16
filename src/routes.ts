import { Router } from "express";
import { v4 as uuid } from "uuid";
import { isAuthenticated } from "./midleware";

const router = Router();

interface User {
  name: string;
  email: string;
  id: string;
}

const users: User[] = [];

router.get("/users/findByName", (request, response) => {
  const { name } = request.query;
  const user = users.filter((u) => u.name.includes(String(name)));
  return response.json(user);
});

router.get("/users/:id", (request, response) => {
  const { id } = request.params;
  const user = users.find((user) => user.id === id);
  return response.json(user);
});

router.post("/users", isAuthenticated, (request, response) => {
  const { name, email, id } = request.body;

  const userAlreadyExists = users.find((user) => user.name === name);

  if (userAlreadyExists) {
    return response.status(400).json({ message: "User already exists!" });
  }

  const user: User = {
    name,
    email,
    id: uuid(),
  };

  users.push(user);

  return response.json(user);
});
export { router };
