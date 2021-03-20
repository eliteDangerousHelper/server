import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Commodity } from "./Commodity";

@Entity()
export class CommodityCategory {

    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column({type: "varchar", unique: true, nullable: true})
    public name: string | null = null;

    @OneToMany(() => Commodity,(commodity: Commodity) => commodity.category)
    public commodities: Commodity[];

}
