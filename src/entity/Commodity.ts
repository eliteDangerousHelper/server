import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { CommodityCategory } from "./CommodityCategory";
import { CommodityStation } from "./CommodityStation";
import { Station } from "./Station";

@Entity()
export class Commodity {

    @PrimaryGeneratedColumn()
    public id: number;

    @OneToMany(() => CommodityStation,(commodityStation: CommodityStation) => commodityStation.commodity)
    public markets: CommodityStation[];

    @ManyToOne(() => CommodityCategory,(commodityCategory: CommodityCategory) => commodityCategory.commodities)
    public category: CommodityCategory;

    @ManyToMany(() => Station, (station: Station) => station.prohibited)
    @JoinTable()
    public prohibitedMarkets: Station[];

    @Column({type: "varchar", nullable: true})
    public name: string | null = null;

}
