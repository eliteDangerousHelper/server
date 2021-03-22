import { Request, Response } from "express";
import { getCustomRepository, getRepository, In, MoreThan } from "typeorm";
import { CommodityStation } from "../entity/CommodityStation";
import { Station } from "../entity/Station";
import { System } from "../entity/System";
import { SystemRepository } from "../repository/SystemRepository";
import { distance as distanceUtils} from "../utils/systemUtils";

export class StationController {
  public async getPrices(req: Request, res: Response) {
    const stationId: string = req.params.id;
    let distance: number = parseInt(req.query.distance as string);
    if (!distance) {
      distance = 80;
    }
    
    const stationRepository = getRepository(Station);

    const station = await stationRepository.findOne({
      where: {
        id: stationId
      },
      relations: ["system", "commodities", "commodities.commodity"]
    })

    if (!station) {
      res.status(404).json({ errors: ["station not found"] });
      return
    }

    const commodityStationRepository = getRepository(CommodityStation);
    const purchasableItems = station.commodities.filter(c => c.stock > 0);

    const systemRepository = getCustomRepository(SystemRepository);
    const systems = await systemRepository.findByDistance(station.system, distance);

    let stations = await stationRepository.find({
      where: {
        system: In(systems.map((s: System) => s.id))
      },
      relations: ['commodities', 'commodities.commodity', 'system'],
    });

    stations = stations
      .filter(s => s.commodities.length)
      .filter(s => s.commodities.filter(c => {
        purchasableItems.filter(p => {
          p.commodity.id === c.commodity.id && p.buy_price > c.sell_price
        }).length
      }))
      .map(s => {
        s.system.distance = distanceUtils(station.system, s.system)
        return s
      })
      .sort((a, b) => a.system.distance - b.system.distance)

    res.json(stations);
  }
}
