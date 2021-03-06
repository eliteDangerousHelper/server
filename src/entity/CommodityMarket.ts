import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Commodity } from "./Commodity";
import { Market } from "./Market";

@Entity()
export class CommodityMarket {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Commodity, (commodity: Commodity) => commodity.markets)
    commodity: Commodity;

    @ManyToOne(() => Market, (market: Market) => market.commodities)
    market: Market;

    @Column()
    buy_price: number;

    @Column()
    demand: number;

    @Column({nullable: true})
    demand_bracket?: number;

    @Column()
    mean_price: number;

    @Column()
    sell_price: number;

    @Column()
    stock: number;

    @Column({nullable: true})
    stock_bracket?: number;

    @Column()
    update_at: Date;
}
