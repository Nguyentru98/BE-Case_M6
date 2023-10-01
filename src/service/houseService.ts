import { Between, Brackets, ILike } from "typeorm";
import { AppDataSource } from "../data-source";
import { House } from "../entities/house";
import { Order } from "../entities/order";

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
        order : true
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
  findByConditions = async (query) => {
    const {
      homeName,
      bath,
      bad,
      address,
      startTime,
      endTime,
      minPrice,
      maxPrice
    } = query;

    const queryBuilder = this.Repository.createQueryBuilder('H')
      .leftJoinAndSelect("H.orders", 'order')
      .leftJoinAndSelect("H.user", 'user')
      .leftJoinAndSelect("H.pictures", 'picture')

      // .where('order.houseId IS NULL')
    if (startTime && endTime && startTime !== endTime) {
      queryBuilder.andWhere(new Brackets(subQuery => {
        subQuery.where('order.checkIn NOT BETWEEN :startTime AND :endTime', { startTime, endTime })
          .andWhere('order.checkOut NOT BETWEEN :startTime AND :endTime', { startTime, endTime })
          .orWhere(new Brackets(sq => {
            sq.where(new Brackets(s => {
              s.where('order.houseId IS NOT NULL')
              .andWhere('order.checkIn NOT BETWEEN :startTime AND :endTime', { startTime, endTime })
              .andWhere('order.checkOut NOT BETWEEN :startTime AND :endTime', { startTime, endTime })
            }))
            
            .orWhere('order.houseId IS NULL')
          }));
      }));
    }

    if (minPrice && maxPrice) {
      queryBuilder.where('H.price BETWEEN :minPrice AND :maxPrice', { minPrice, maxPrice });
    }

    if (homeName) {
      queryBuilder.andWhere('H.name LIKE :homeName', { homeName: `%${homeName}%` });
      }      
    if (bath) {
      queryBuilder.andWhere('H.numberOfBathrooms = :bath', { bath });
    }
    if (bad) {
      queryBuilder.andWhere('H.numberOfBedrooms = :bad', { bad });
    }
    if (address) {
      queryBuilder.andWhere('H.address LIKE :address', { address: `%${address}%` });
    }

    console.log(queryBuilder.getQueryAndParameters());
    console.log(await queryBuilder.getMany(), 'result');
    
    
    return await queryBuilder.getMany();
  }
}

export default new HouseService();