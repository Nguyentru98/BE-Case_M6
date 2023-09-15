import {Router} from "express";
import userController from "../controller/userController";

const userRouter = Router();
userRouter.delete('/:id', userController.delete);
userRouter.get('/', userController.getAllUser);
userRouter.get('/:id', userController.findById);
userRouter.put('/:id', userController.update);

export default userRouter;
