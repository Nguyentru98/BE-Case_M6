import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { User } from "./user";
import { House } from "./house";
@Entity()
export class Order {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'datetime'})
    rentalTime: number;

    @Column({type: 'date'})
    checkIn: number;

    @Column({type: 'int'})
    houseId: number;

    @Column({type: 'date'})
    checkOut: number;

    @Column({type: 'varchar'})
    totalMoney: number;

    @Column({type: 'varchar'})
    status: string;

    @Column({type: 'varchar'})
    action: string;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @ManyToOne(() => House, (house) => house.orders)
    @JoinColumn({ name: "houseId", referencedColumnName: "id"})
    houses: House;
   
}