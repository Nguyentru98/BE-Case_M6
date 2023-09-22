import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Order} from "./order";
import {House} from "./house";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    username: string;

    @Column({type: 'varchar'})
    fullName: string;

    @Column({type: 'varchar'})
    address: string;

    @Column({type: 'varchar'})
    password: string;

    @Column({type: 'varchar'})
    role: string;

    @Column({type: 'varchar'})
    telephone: number;

    @Column({type: 'varchar'})
    avatar: string;

    @Column({type: 'varchar', default:"mở khóa"})
    status: string;

    @OneToMany(() => House, (house) => house.user)
    house: House[];
}
