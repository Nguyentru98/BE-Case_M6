import { AppDataSource } from "../data-source";
import { Picture } from "../entities/picture";


class PictureService {
    private Repository;
    constructor() {
        this.Repository = AppDataSource.getRepository(Picture);
    }
    postPicture = async (data) => {
        return await this.Repository.save(data)
    }
    updatePicture =async (id, data) => {
        return await this.Repository.update(id,data)
    }
    deletePicture =async (id) => {
        return await this.Repository.delete(id)
    }
    findByAll = async ()=>{
        return await this.Repository.find({
            relations : {
                house : true
            },
        })
    }
    findById = async (id)=>{
        return await this.Repository.findOne({
             where: { id },
             relations : {
                house : true
            }, 
        })
    }


}
export default new PictureService();