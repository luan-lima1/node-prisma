import { Router } from "express";
import userController from "../Modules/user-module/controller/userController";
import UserRepository from "../Modules/user-module/repository/userRepository";
import UserService from "../Modules/user-module/service/userService";

const userRouter = Router();

const instanceController = new userController(
  new UserService(new UserRepository())
);

userRouter.post("/user", instanceController.handle);
userRouter.get("/:id", instanceController.getIdData);
userRouter.put("/:id", instanceController.updateData);
userRouter.delete("/:id", instanceController.deleteData);

export default userRouter;
