import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
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

    @Column({type: 'varchar'})
    numberOfBedrooms: number;

    @Column({type: 'varchar'})
    numberOfBathrooms: number;

    @Column({type: 'varchar'})
    description: string;

    @Column({type: 'varchar'})
    price: number;

    // @Column({type: 'longtext', nullable: true})
    // defaultImage: string;

    @Column({type: 'varchar'})
    status: string;

    @Column({type: 'int'})
    rentals: number;

        // @Column({type: 'int'})
        // userId: number;

    // @Column({type: 'int',default: 0 })
    // orderId: number;

    @ManyToOne(() => User, (userObj) => userObj.id)
    user: User;
    
    @OneToMany(() => Order, (order) => order.house)
    order: Order[];

    @OneToMany(() => Picture, (picture) => picture.house)
    picture: Picture[];
}
