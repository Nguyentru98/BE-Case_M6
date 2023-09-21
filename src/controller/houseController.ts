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
    let house = "";
    let {
      name,
      status,
      id,
      rentals,
      startDate,
      endDate,
      address,
      startPrice,
      endPrice,
      checkOut,
      checkIn,
      rentalStartTime,
      rentalEndTime
    } = req.query;
    if (name) {
      house = await this.houseService.findByName(name);
    } else if (address) {
      house = await this.houseService.findByAdress(address);
    } else if (startPrice && endPrice) {
      house = await this.houseService.findByPrice(startPrice, endPrice);
    } else if (status && id) {
      house = await this.houseService.findByStatus(status, id);
    } else if (rentals) {
      house = await this.houseService.topRooms(rentals);
    } else if (startDate && endDate) {
      console.log("time");
      house = await this.houseService.findByTime(startDate, endDate);
    } else if (checkOut && checkIn) {
      let data = await this.houseService.findHousetest(checkIn, checkOut);
      res.json(data);
    // }else if (req.query) {
    //   console.log(req.query)
    //     let data = await this.houseService.findByHouse(req.query);
    //     res.json(data);
    } else {
      console.log("all");
      house = await this.houseService.findByAll();
    }
    res.json(house);
  };
  findById = async (req: Request, res: Response) => {
    let house = await houseService.findById(req.params.id);
    res.json(house);
  };
  createHouse = async (req: Request, res: Response) => {
    let house = await this.houseService.createHouse(req.body);
    res.json("them nha thanh cong");
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
