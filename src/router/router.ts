import {Router} from "express";
import userRouter from "./userRouter";
import userController from "../controller/userController";
import houseRouter from "./houseRouter";
import pictureRouter from "./pictureRouter";
import orderRouter from "./orderRouter";

const router = Router();
router.use('/users', userRouter);
router.use('/houses', houseRouter);
router.use('/pictures', pictureRouter);
router.use('/orders', orderRouter);
router.post('/login', userController.login);
router.post('/register', userController.register);
export default router;
