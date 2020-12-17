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
    public id: number;

    @OneToMany(() => CommodityMarket,(commodityMarket: CommodityMarket) => commodityMarket.market)
    public commodities: CommodityMarket[];

    @ManyToMany(() => Commodity, (commodity: Commodity) => commodity.prohibitedMarkets )
    public prohibited: Commodity[];

    @OneToOne(() => Station, (station: Station) => station.market)
    @JoinColumn()
    station!: Station;

    @Column()
    public external_id: string;

}
