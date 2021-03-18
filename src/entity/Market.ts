import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
} from "typeorm";
import { Station } from "./Station";

@Entity()
export class Market {

    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(() => Station, (station: Station) => station.market)
    @JoinColumn()
    station!: Station;

    @Column()
    public external_id: string;

}
