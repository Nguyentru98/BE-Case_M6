import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { User } from "./user";
import { House } from "./house";
@Entity()
export class Order {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    rentalTime: string;

    @Column({type: 'datetime'})
    checkIn: string;

    @Column({type: 'datetime'})
    checkOut: string;

    @Column({type: 'varchar'})
    totalMoney: string;

    @Column({type: 'varchar'})
    status: string;

    @Column({type: 'varchar'})
    action: string;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @ManyToOne(() => House, (house) => house.id)
    house: House;
   
}
