import { Between, ILike } from "typeorm";
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
  // findByName = async (name) => {
  //   return await this.Repository.find({
  //     where: {
  //       name: ILike(`%${name}%`),
  //     },
  //     relations: {
  //       user: true,
  //     },
  //   });
  // };
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
  // findByBedroom = async (room) => {
  //   return await this.Repository.find({
  //     where: {
  //       numberOfBedrooms: room,
  //     },
  //   });
  // };
  
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
      .leftJoinAndSelect("H.order", 'order')
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
      queryBuilder.andWhere('H.address = :address', { address });
    }
    if (startTime && endTime) {
      return await this.Repository.query(`
      SELECT house.*
      FROM house
      LEFT JOIN \`order\` ON house.id = \`order\`.houseId
      AND ('${startTime}' <= \`order\`.checkOut and '${endTime}' >= \`order\`.checkIn)
      WHERE \`order\`.houseId IS NULL;
    `);
    }
    if (minPrice !== undefined && maxPrice !== undefined) {
      return await this.Repository.createQueryBuilder('H')
        .where('H.price BETWEEN :minPrice AND :maxPrice', { minPrice, maxPrice })
        .getMany();
    }
    console.log(await queryBuilder.getMany(), 'queryBuilder.getMany()');
    
    return await queryBuilder.getMany();
  }

  // findByBathroom = async (room) => {
  //   return await this.Repository.find({
  //     where: {
  //       numberOfBathrooms: room,
  //     },
  //   });
  // };
  // findByAdress = async (address) => {
  //   return await this.Repository.find({
  //     where: {
  //       address: address,
  //     },
  //   });
  // };
  // findByPrice = async (startPrice, endPrice) => {
  //   return await this.Repository.find({
  //     where: {
  //       price: Between(startPrice, endPrice),
  //     },
  //   });
  // };
}

export default new HouseService();