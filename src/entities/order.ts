import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { User } from "./user";
import { House } from "./house";
@Entity()
export class Order {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'datetime'})
    rentalTime: number;

    @Column({type: 'datetime'})
    checkIn: number;

    @Column({type: 'datetime'})
    checkOut: number;

    @Column({type: 'varchar'})
    totalMoney: number;

    @Column({type: 'varchar'})
    status: string;

    @Column({type: 'varchar'})
    action: string;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @ManyToOne(() => House, (house) => house.id)
    house: House;
   
}
