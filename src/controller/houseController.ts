import houseService from "../service/houseService";
import {Request, Response} from "express";

class HouseController {
    private houseService;

    constructor() {
        this.houseService = houseService;
    }
    findAll = async (req: Request, res: Response) => {
        let house='';   
        if(req.query.name) {
            house = await this.houseService.findByName(req.query.name)
        }
        else if(req.query.status) {
            house = await this.houseService.findByStatus(req.query.status)
        }
        else {
            house = await this.houseService.findByAll()
        }
        res.json(house);
    }
    findById = async (req: Request, res: Response) => {
        let  user= await houseService.findById(req.params.id)
        res.json(user);
    }
    createHouse = async (req: Request, res: Response) => {
        let house = await this.houseService.createHouse(req.body);
        res.json("them nha thanh cong")
    }
    update= async (req: Request, res: Response) => {
        let result = await this.houseService.update(req.params.id, req.body);
        res.json("sửa thành công")
    }
    deleteHouse = async (req: Request, res: Response) => {
        let  result = await houseService.deleteHouse(req.params.id)
        res.json('xoa thanh cong');
    }

}

export default new HouseController()