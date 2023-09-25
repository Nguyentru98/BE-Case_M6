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

      },
    });
  };
  findById = async (id) => {
    return await this.Repository.findOne({
      where: { id },
      relations: {
        user: true,
        picture: true,
        order: true,
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
}

export default new HouseService();
