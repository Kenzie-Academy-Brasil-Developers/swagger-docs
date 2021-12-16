import { Router } from "express";
import CreateUserController from "./controllers/createUser.controller";
import ListUsersController from "./controllers/listUsers.controller";
import UpdateUsersController from "./controllers/updateUser.controller";
import DeleteUsersController from "./controllers/deleteUser.controller";
import UserLoginController from "./controllers/userLogin.controller";
import authenticateUser from "./middlewares/authenticateUser.middleware";

const router = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUsersController = new UpdateUsersController();
const deleteUsersController = new DeleteUsersController();
const userLoginController = new UserLoginController();

router.post("/users", createUserController.handle);
router.get("/users", listUsersController.handle);
router.patch("/users/:id", authenticateUser, updateUsersController.handle);
router.delete("/users/:id", authenticateUser, deleteUsersController.handle);
router.post("/login", userLoginController.handle);

export default router;
