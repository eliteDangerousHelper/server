import CommodityMessage from "../interfaces/CommodityMessage";
import { getCustomRepository, getRepository } from "typeorm";
import { Market } from "../entity/Market";
import { CommodityStation } from "../entity/CommodityStation";
import { Commodity } from "../entity/Commodity";
import { System } from "../entity/System";
import { Station } from "../entity/Station";
import { CommodityRepository } from "../repository/CommodityRepository";

export default async (message: CommodityMessage) => {
  const marketRepository = getRepository(Market);
  const commodityRepository = getCustomRepository(CommodityRepository);
  const commodityStationRepository = getRepository(CommodityStation);
  const systemRepository = getRepository(System);
  const stationRepository = getRepository(Station);
  const prohibitedList: Commodity[] = [];

  let market = await marketRepository.findOne({
    where: {
      external_id: message.marketId.toString()
    }
  })

  if (!market) {    
    market = new Market();
    market.external_id = message.marketId.toString();
  }
  
  if (!market.station) {
    let system = await systemRepository.findOne({
      where: {
        name: message.systemName
      }
    });

    if (!system) {
      system = new System();
      system.name = message.systemName;

      await systemRepository.save(system);
    }
    
    let station = await stationRepository.findOne({
      where: {
        name: message.stationName,
        system
      },
      relations: ["commodities"]
    });

    if (!station) {
      station = new Station()
      station.name = message.stationName;
      station.system = system;

      if (message.prohibited) {
        for (const p of message.prohibited) {
          let prohibited = await commodityRepository.findOneByName(p)
        
          if (!prohibited) {
            prohibited = new Commodity();
            prohibited.name = p;
            await commodityRepository.save(prohibited);
          }
          prohibitedList.push(prohibited);
        }
      }
  
      station.prohibited = prohibitedList;

      await stationRepository.save(station);
    }

    market.station = station;

    message.commodities.forEach(async c => {
      let commodity = await commodityRepository.findOneByName(c.name)
  
      if (!commodity) {
        return;
      }
  
      let commodityStation = undefined;
      if (station?.commodities) {
        commodityStation = station?.commodities.find(cm => cm.commodity === commodity);
      }
  
      if (!commodityStation) {
        commodityStation = new CommodityStation();
        commodityStation.station = station!;
        commodityStation.commodity = commodity;
      }
      
      commodityStation.buy_price = c.buyPrice;
      commodityStation.demand = c.demand;
      commodityStation.demand_bracket = c.demandBracket === "" ? undefined : c.demandBracket;
      commodityStation.mean_price = c.meanPrice;
      commodityStation.sell_price = c.sellPrice;
      commodityStation.stock = c.stock;
      commodityStation.stock_bracket = c.stockBracket === "" ? undefined : c.stockBracket;
      commodityStation.update_at = new Date(message.timestamp);
  
      await commodityStationRepository.save(commodityStation).catch(reason => console.log(c));    
    })
  }
  await marketRepository.save(market);
}
