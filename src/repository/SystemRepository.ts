import {EntityRepository, Repository} from "typeorm";
import {System} from "../entity/System";

@EntityRepository(System)
export class SystemRepository extends Repository<System> {

    findByDistance(referenceSystem: System, distance: number) {
        return this.createQueryBuilder('s')
            .having('SQRT(POW(:x - s.position_x, 2) + POW(:y - s.position_y, 2) + POW(:z - position_z, 2)) <= :distance', {
                x: referenceSystem.position_x,
                y: referenceSystem.position_y,
                z: referenceSystem.position_z,
                distance
            })
            .getMany();
    }

}