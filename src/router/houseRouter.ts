import {Router} from "express";
import houseController from "../controller/houseController";

const houseRouter = Router();
houseRouter.delete('/:id', houseController.deleteHouse);
houseRouter.get('/', houseController.findAll);
houseRouter.put('/:id', houseController.updateHouse);
houseRouter.post('/', houseController.postHouse);

export default houseRouter;