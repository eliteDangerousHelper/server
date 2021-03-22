import { EntityRepository, In, Repository } from "typeorm";
import { Commodity } from "../entity/Commodity";
import { slugify } from "../utils/stringUtils";

@EntityRepository(Commodity)
export class CommodityRepository extends Repository<Commodity> {

    findOneByName(name: string) {
        const slugs = [
            name,
            name.toLowerCase(),
            slugify(name)
        ];

        return this.createQueryBuilder('s')
            .where('slug', In(slugs))
            .getOne();
    }
}