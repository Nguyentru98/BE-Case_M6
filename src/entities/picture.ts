import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { House } from "./house";

@Entity()
export class Picture {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    picture: string;

}

