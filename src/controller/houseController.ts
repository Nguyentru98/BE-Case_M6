import houseService from "../service/houseService";
import { Request, Response } from "express";
import orderSevice from "../service/orderService";

class HouseController {
  private houseService;
  private orderSevice;

  constructor() {
    this.houseService = houseService;
    this.orderSevice = orderSevice;
  }
  findAll = async (req: Request, res: Response) => {
    let {
      homeName,
      bath,
      bad,
      address,
      startTime,
      endTime,
      minPrice,
      maxPrice
    } = req.query;

    
    console.log(startTime,endTime,homeName, address, bad, bath,minPrice,maxPrice,'data req');
    const houses = await this.houseService.findByConditions(req.query);
    res.json(houses);
  };
  findById = async (req: Request, res: Response) => {
    let house = await houseService.findById(req.params.id);
    res.json(house);
  };
  createHouse = async (req: Request, res: Response) => {
    req.body.rentals = 0;
    let house = await this.houseService.createHouse(req.body);
    res.status(200).json(house);
  };
  update = async (req: Request, res: Response) => {
    let house = await houseService.findById(req.params.id);
    // validate du lieu
    if (house.status === "chothue") {
      res.status(400).json({
        message: "Khong the chuyen trang thai cua phong dang su dung!",
      });
      return;
    }
    let result = await this.houseService.update(req.params.id, req.body);
    res.json("sửa thành công");
  };
  deleteHouse = async (req: Request, res: Response) => {
    let result = await houseService.delete(req.params.id);
    res.json("xoa thanh cong");
  };
}

export default new HouseController();