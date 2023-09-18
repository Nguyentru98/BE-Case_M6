import {Router} from "express";
import pictureController from "../controller/pictureController";

const pictureRouter = Router();
pictureRouter.post('/', pictureController.postPicture);
pictureRouter.get('/', pictureController.findAll);
pictureRouter.get('/:id', pictureController.findById);

export default pictureRouter;