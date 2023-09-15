import {Router} from "express";
import pictureController from "../controller/pictureController";

const pictureRouter = Router();
pictureRouter.post('/', pictureController.postPicture);
pictureRouter.get('/', pictureController.findAll);

export default pictureRouter;