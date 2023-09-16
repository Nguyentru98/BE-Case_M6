import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    username: string;

    @Column({type: 'varchar'})
    firstName: string;

    @Column({type: 'varchar'})
    lastName: string;

    @Column({type: 'varchar'})
    address: string;

    @Column({type: 'varchar'})
    password: string;

    @Column({type: 'varchar'})
    role: string;

    @Column({type: 'varchar'})
    telephone: string;

    @Column({type: 'varchar'})
    avatar: string;

    @Column({type: 'varchar'})
    status: string;
   
}
