import { Between, ILike } from "typeorm";
import { AppDataSource } from "../data-source";
import { House } from "../entities/house";

class HouseService {
  private Repository;
  constructor() {
    this.Repository = AppDataSource.getRepository(House);
  }


  createHouse = async (data) => {
    return await this.Repository.save(data);
  };

  update = async (id, data) => {
    return await this.Repository.update(id, data);
  };
  delete = async (id) => {
    return await this.Repository.delete(id);
  };
  findByAll = async () => {
    return await this.Repository.find({
      relations: {
        user: true,
        picture: true
      },
    });
  };
  findById = async (id) => {
    return await this.Repository.findOne({
      where: { id },
      relations: {
        user: true,
        picture: true
      },
    });
  };
  findByName = async (name) => {
    return await this.Repository.find({
      where: {
        name: ILike(`%${name}%`),
      },
      relations: {
        user: true,
      },
    });
  };
  findByStatus = async (status, userId) => {
    return await this.Repository.find({
      where: {
        status,
        user: {
          id: userId,
        },
      },
      relations: {
        user: true,
      },
    });
  };
  topRooms = async (sort) => {
    return await this.Repository.find({
      order: {
        rentals: sort,
      },
      take: 5,
    });
  };
  findByBedroom = async (room) => {
    return await this.Repository.find({
      where: {
        numberOfBedrooms: room,
      },
    });
  };
  findByBathroom = async (room) => {
    return await this.Repository.find({
      where: {
        numberOfBathrooms: room,
      },
    });
  };
  findByAdress = async (address) => {
    return await this.Repository.find({
      where: {
        address: address,
      },
    });
  };
  findByPrice = async (startPrice, endPrice) => {
    return await this.Repository.find({
      where: {
        price: Between(startPrice, endPrice),
      },
    });
  };

// findByHouse = async (StartTime,EndTime)=>{
//   const rentalStartTime = new Date(StartTime);
//   const rentalEndTime = new Date(EndTime);
//   // Thực hiện truy vấn
//   const houseService = new HouseService(); // Tạo một thể hiện của HouseService
//   return await houseService.Repository
//   .createQueryBuilder("house")
//   .leftJoinAndSelect("house.order", "order")
//   .where("order.id IS NULL") // Chỉ lấy những nhà chưa có đơn thuê
//   .andWhere("house.status = :status", { status: "chothue" })
//   .andWhere("(:rentalStartTime BETWEEN order.checkIn AND order.checkOut OR :rentalEndTime BETWEEN order.checkIn AND order.checkOut OR order.checkIn BETWEEN :rentalStartTime AND :rentalEndTime OR order.checkOut BETWEEN :rentalStartTime AND :rentalEndTime)", {
//     rentalStartTime,
//     rentalEndTime,
//   })
//   .getMany();
// }
}

export default new HouseService();
