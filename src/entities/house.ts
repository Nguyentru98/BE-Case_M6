import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { User } from "./user";
import { Picture } from "./picture";
import { Order } from "./order";

@Entity()
export class House {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar'})
    address: string;

    @Column({type: 'int'})
    numberOfBedrooms: number;

    @Column({type: 'int'})
    numberOfBathrooms: number;

    @Column({type: 'varchar'})
    description: string;

    @Column({type: 'int'})
    price: number;

    // @Column({type: 'varchar',nullable: true})
    // defaultImage: string;

    @Column({type: 'varchar'})
    status: string;

    @Column({type: 'int', default:0})
    rentals: number;

    @Column({type: 'int'})
    userId: number;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @ManyToOne((type) => Order, (order) => order.id)
    @JoinColumn({ name: "id", referencedColumnName: "houseId"})
    order: Order
    
    @OneToMany(() => Picture, (picture) => picture.house)
    pictures: Picture[];
    

}