import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";
import { System } from "./System";
import { Market } from "./Market";

@Entity()
export class Station {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @Column()
    public system_id!: string;

    @ManyToOne(() => System, (system: System) => system.stations)
    system!: System;

    @OneToOne(() => Market, (market: Market) => market.station)
    market!: Market;
}
