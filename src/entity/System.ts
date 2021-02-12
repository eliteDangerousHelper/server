import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Station } from "./Station";

@Entity()
export class System {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({unique: true})
    public name: string;

    @Column({type: "int", nullable: true})
    public position_x: number | null = null;

    @Column({type: "int", nullable: true})
    public position_y: number | null = null;

    @Column({type: "int", nullable: true})
    public position_z: number | null = null;

    @Column({type: "varchar", unique: true, nullable: true})
    public external_id: string | null = null;

    @OneToMany(() => Station, (station: Station) => station.system)
    stations: Station[];

}
