import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    OneToMany,
    JoinColumn,
    ManyToMany
} from "typeorm";
import { Station } from "./Station";
import { CommodityMarket } from "./CommodityMarket";
import { Commodity } from "./Commodity";

@Entity()
export class Market {

    @PrimaryGeneratedColumn()
    public id: number = 0;

    @OneToMany(() => CommodityMarket,(commodityMarket: CommodityMarket) => commodityMarket.market)
    public commodityMarket!: CommodityMarket[];

    @ManyToMany(() => Commodity, (commodity: Commodity) => commodity.prohibitedMarkets )
    public prohibited!: Commodity[];

    @OneToOne(() => Station, (station: Station) => station.market)
    @JoinColumn()
    station!: Station;

    @Column()
    public name: string = "";

}
