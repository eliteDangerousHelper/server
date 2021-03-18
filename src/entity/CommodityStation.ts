import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Commodity } from "./Commodity";
import { Station } from "./Station";

@Entity()
export class CommodityStation {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Commodity, (commodity: Commodity) => commodity.markets)
    commodity: Commodity;

    @ManyToOne(() => Station, (station: Station) => station.commodities)
    station: Station;

    @Column()
    buy_price: number;

    @Column()
    demand: number;

    @Column({type: "int", nullable: true})
    demand_bracket?: number|null = null;

    @Column({type: "int", nullable: true})
    mean_price?: number|null = null;

    @Column()
    sell_price: number;

    @Column()
    stock: number;

    @Column({type: "int", nullable: true})
    stock_bracket?: number|null = null;

    @Column()
    update_at: Date;
}
