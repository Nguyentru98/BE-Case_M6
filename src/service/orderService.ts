import { ILike } from "typeorm";
import { AppDataSource } from "../data-source";
import { Order } from "../entities/order";

class OrderService {
    private Repository;
    constructor() {
        this.Repository = AppDataSource.getRepository(Order);
    }

    orderHouse = async (data) => {
        return await this.Repository.save(data)
    }

    update =async (id, data) => {
        return await this.Repository.update(id,data)
    }
    delete =async (id) => {
        return await this.Repository.delete(id)
    }
    findByAll = async ()=>{
        return await this.Repository.find({
            relations : {
                user : true,
                house : true
            },
            
        })
    }
    findById = async (id)=>{
        return await this.Repository.find({
            where: { 
               user: {
                    id :id
                }
            },
            relations : {
                user : true,
                house : true
            },
        })
    }
    findByName = async (name,id)=>{
        return await this.Repository.find({
            where: {
                house:{
                    name: ILike(`%${name}%`)
                },
                user:{
                    id:id
                }               
            },
            relations : {
                user : true,
                house : true
            },
        })
    }

}

export default new OrderService()