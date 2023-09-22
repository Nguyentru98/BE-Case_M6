import orderSevice from "../service/orderService";
import {Request, Response} from "express";

class OrderController {
    private orderSevice;

    constructor() {
        this.orderSevice = orderSevice;
    }
    findAll = async (req: Request, res: Response) => {
        let order='';
        if(req.query.name && req.query.id) {
            order = await this.orderSevice.findByName(req.query.name, req.query.id)
        }
        else if(req.query.startDate,req.query.endDate,req.query.id) {
            order= await orderSevice.findByTime(req.query.startDate,req.query.endDate,req.query.id)
        }
        else{
            order = await this.orderSevice.findByAll()
        } 
        res.json(order)
    }
    
    findById = async (req: Request, res: Response) => {
        let  order= await orderSevice.findById(req.params.id)
        let totalMoneySum = 0;
        
        for( let i=0; i<order.length ; i++ ) {
            totalMoneySum += parseInt(order[i].totalMoney);
        }
        const response = {
            ...order,
            totalMoneySum
        };
        res.json(response);
    }
    order = async (req: Request, res: Response) => {
        let order = await this.orderSevice.orderHouse(req.body);
        res.json("them nha thanh cong")
    }
    update= async (req: Request, res: Response) => {
        let order = await orderSevice.findById(req.params.id);
        // validate du lieu

        if (order.status === 'chothue') {
            res.status(400).json({'message': 'Khong the chuyen trang thai cua phong dang su dung!'});
            return;
        }
        let result = await this.orderSevice.update(req.params.id, req.body);
        res.json("sửa thành công")
    }
    delete = async (req: Request, res: Response) => {
        let  result = await orderSevice.delete(req.params.id)
        res.json('xoa thanh cong');
    }

}

export default new OrderController()