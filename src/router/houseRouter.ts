import {Router} from "express";
import houseController from "../controller/houseController";

const houseRouter = Router();
houseRouter.delete('/:id', houseController.deleteHouse);
houseRouter.get('/', houseController.findAll);
houseRouter.get('/:id', houseController.findById);
houseRouter.put('/:id', houseController.update);
houseRouter.post('/', houseController.createHouse);

export default houseRouter;