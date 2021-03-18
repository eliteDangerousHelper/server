import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, ManyToMany, OneToMany } from "typeorm";
import { System } from "./System";
import { Market } from "./Market";
import { CommodityStation } from "./CommodityStation";
import { Commodity } from "./Commodity";

@Entity()
export class Station {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: "varchar", nullable: true})
    public name?: string|null = null;

    @ManyToOne(() => System, (system: System) => system.stations)
    public system: System;

    @OneToOne(() => Market, (market: Market) => market.station)
    public market: Market;

    @OneToMany(() => CommodityStation,(commodityStation: CommodityStation) => commodityStation.station)
    public commodities: CommodityStation[];

    @ManyToMany(() => Commodity, (commodity: Commodity) => commodity.prohibitedMarkets )
    public prohibited: Commodity[];
}
