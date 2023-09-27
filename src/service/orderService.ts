import { Between, ILike, getConnection } from "typeorm";
import { AppDataSource } from "../data-source";
import { Order } from "../entities/order";
import moment from 'moment';

class OrderService {
  private Repository;
  constructor() {
    this.Repository = AppDataSource.getRepository(Order);
    
  }

  orderHouse = async (data) => {
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
        house: true,
      },
    });
  };

  findById = async (id) => {
    return await this.Repository.find({
      where: {
        user: {
          id: id,
        },
      },
      relations: {
        user: true,
        house: true,
      },
    });
  };

  findByName = async (name, id) => {
    return await this.Repository.find({
      where: {
        house: {
          name: ILike(`%${name}%`),
        },
        user: {
          id: id,
        },
      },
      relations: {
        user: true,
        house: true,
      },
    });
  };
  findByTime = async (startDate, endDate, id) => {
    return await this.Repository.find({
      where: {
        rentalTime: Between(startDate, endDate),
        user: {
          id: id,
        },
      },
      relations: {
        house: true,
      },
    });
  };

  findByHouse = async (startTime, endTime) => {
    return await this.Repository.query(`
      SELECT house.*
      FROM house
      LEFT JOIN \`order\` ON house.id = \`order\`.houseId
      AND ('${startTime}' <= \`order\`.checkOut and '${endTime}' >= \`order\`.checkIn)
      WHERE \`order\`.houseId IS NULL;
    `);

  };
}

export default new OrderService();
