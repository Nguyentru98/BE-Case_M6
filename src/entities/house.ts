import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { User } from "./user";
import { Picture } from "./picture";

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

    @Column({type: 'varchar'})
    avatar: string;

    @Column({type: 'varchar'})
    status: string;

    @Column({type: 'int'})
    rentals: number;

    @Column({type: 'int'})
    userId: number;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

}
