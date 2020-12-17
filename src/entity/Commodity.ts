import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { CommodityMarket } from "./CommodityMarket";
import { Market } from "./Market";

@Entity()
export class Commodity {

    @PrimaryGeneratedColumn()
    public id: number = 0;

    @OneToMany(() => CommodityMarket,(commodityMarket: CommodityMarket) => commodityMarket.commodity)
    public commodityMarket!: CommodityMarket[];

    @ManyToMany(() => Market, (market: Market) => market.prohibited)
    @JoinTable()
    public prohibitedMarkets!: Market[];

    @Column()
    public name: string = "";

}
