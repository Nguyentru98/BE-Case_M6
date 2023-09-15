import pictureService from "../service/pictureService";
import {Request, Response} from "express";

class PictureController {
    private pictureService;

    constructor() {
        this.pictureService = pictureService;
    }
    postPicture = async (req:Request , res:Response) =>{
       let picture= await pictureService.postPicture(req.body)
       return(picture)
    }
    findAll = async (req: Request, res: Response) => {
        let picture='';   
        if(req.query.id) {
            picture = await this.pictureService.findById(req.query.id)
        }
        else {
            picture = await this.pictureService.findByAll()
        }
        res.json(picture);
    }
    updatepicture = async (req: Request, res: Response) => {
        let result = await this.pictureService.updatePicture(req.params.id, req.body);
        res.json("sửa thành công")
    }
    deletepicture = async (req: Request, res: Response) => {
        let  result = await pictureService.deletePicture(req.params.id)
        res.json('xoa thanh cong');
    }
}
export default new PictureController();
