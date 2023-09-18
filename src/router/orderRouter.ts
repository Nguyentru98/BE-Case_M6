import {Router} from "express";
import orderController from "../controller/orderController";

const orderRouter = Router();
orderRouter.delete('/:id', orderController.delete);
orderRouter.get('/', orderController.findAll);
orderRouter.get('/:id', orderController.findById);
orderRouter.put('/:id', orderController.update);
orderRouter.post('/', orderController.order);

export default orderRouter;