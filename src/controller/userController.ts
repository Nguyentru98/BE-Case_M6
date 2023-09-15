import {Request, Response} from "express";
import userService from "../service/userService";

class UserController {
    private userService;

    constructor() {
        this.userService = userService;
    }
    getAllUser = async (req: Request, res: Response) => {
        let user='';   
        if(req.query.id){
            user = await this.userService.findById(req.query.id)
        }
        else if(req.query.role) {
            user = await this.userService.getUser(req.query.role)
        }
        else{
            user = await this.userService.getAll();
        }
        res.json(user);
    }

    register = async (req: Request, res: Response) => {
        let result = await userService.register(req.body);
        res.json("dang ky tai khoan thanh cong");
    }

    login = async (req: Request, res: Response) => {
        try {
            let resultCheck = await userService.checkUser(req.body);
            res.status(200).json({
                message: {

                    token : resultCheck,
                    username :req.body.username},
                success: true,

            });
        } catch (e) {
            console.log('error login: ', e);
            res.status(500).json({
                message: 'error login',
                success: false
            });

        }
    }
    // findById = async (req: Request, res: Response) => {
    //     let  user= await userService.findById(req.params.id)
    //     res.json(user);
    // }
    update = async (req: Request, res: Response) => {
        let result = await this.userService.update(req.params.id, req.body);
        res.json("sửa thành công")
    }

    delete = async (req: Request, res: Response) => {
        let  user = await userService.delete(req.params.id)
        res.json('xoa thanh cong');
    }
}

export default new UserController();
