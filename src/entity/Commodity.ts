import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { CommodityStation } from "./CommodityStation";
import { Station } from "./Station";

@Entity()
export class Commodity {

    @PrimaryGeneratedColumn()
    public id: number;

    @OneToMany(() => CommodityStation,(commodityStation: CommodityStation) => commodityStation.commodity)
    public markets: CommodityStation[];

    @ManyToMany(() => Station, (station: Station) => station.prohibited)
    @JoinTable()
    public prohibitedMarkets: Station[];

    @Column({type: "varchar", unique: true, nullable: true})
    public name: string | null = null;

}
