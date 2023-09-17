import { User } from "../entities/user";
import {AppDataSource} from "../data-source";
import { Like } from "typeorm";
import jwt from "jsonwebtoken";
import {SECRET} from "../middleware/jwt";
import bcrypt from 'bcrypt'
import {Request} from "express";

class UserService {
    private Repository;
    constructor() {
        this.Repository = AppDataSource.getRepository(User);
    }
   
    getUser = async (role) => {
        return await this.Repository.find({
            where : {
                role : role,
            }
        })
    }
    getAll = async () => {
        return await this.Repository.find()
    }
    findById = async (id) => {
        return await this.Repository.findOne(
            {
                where: {
                    id: id
                }
        })
    }
    update = async (id, data) => {
        data.password = await bcrypt.hash(data.password, 10);
        return await this.Repository.update(id, data)
    }
    delete = async (id) => {
        return await this.Repository.delete(id)
    }
    register = async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
        return this.Repository.save(user);
    }
    checkUser = async (user) => {
        try{
            let userFind = await this.Repository.findOneBy({username: user.username});
            if (!userFind) {
                return 'User is not exist'
            } else {
                let passWordCompare =  await bcrypt.compare(user.password, userFind.password);
                if (passWordCompare) {
                    let payload = {
                        idUser: userFind.id,
                        username: userFind.username,
                        role: 'admin',
                        image : userFind.image
                    }
                    let token = jwt.sign(payload, SECRET, {
                        expiresIn: 36000 * 10 * 100
                    })

                    payload["token"]= token
                    return payload
                } else {
                    return 'Password is wrong'
                }
            }
        } catch (e) {
            console.log("error checkUser", e)
        }

    }
    // totalAmountSpent = async (id)=>{
    //     return await this.Repository.find({
    //         select SUM: ["totalMoney"],
    //         where: { id },
    //         relations : {
    //             house : true
    //         },
    //     })
    // } 
}
export default new UserService();

