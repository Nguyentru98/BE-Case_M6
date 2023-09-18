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
        else if(req.query.status && req.query.userId) {
            house = await this.houseService.findByStatus(req.query.status, req.query.userId)
        }
        else if(req.query.rentals) {
            house = await this.houseService.findBySort(req.query.rentals)
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
        let house = await houseService.findById(req.params.id);
        // validate du lieu
        if (house.status === 'chothue') {
            res.status(400).json({'message': 'Khong the chuyen trang thai cua phong dang su dung!'});
            return;
        }
        let result = await this.houseService.update(req.params.id, req.body);
        res.json("sửa thành công")
    }
    deleteHouse = async (req: Request, res: Response) => {
        let  result = await houseService.delete(req.params.id)
        res.json('xoa thanh cong');
    }

}

export default new HouseController()