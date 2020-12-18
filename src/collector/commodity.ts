import CommodityMessage from "../interfaces/CommodityMessage";
import { getRepository } from "typeorm";
import { Market } from "../entity/Market";
import { CommodityMarket } from "../entity/CommodityMarket";
import { Commodity } from "../entity/Commodity";

export default async (message: CommodityMessage) => {
  const marketRepository = getRepository(Market);
  const commodityRepository = getRepository(Commodity);
  const commodityMarketRepository = getRepository(CommodityMarket);

  let market = await marketRepository.findOne({
    where: {
      external_id: message.marketId.toString()
    },
    relations: ["commodities"]
  })

  if (!market) {    
    market = new Market();
    market.external_id = message.marketId.toString();
    await marketRepository.save(market);
  }

  message.commodities.forEach(async c => {
    let commodity = await commodityRepository.findOne({
      where: {
        name: c.name
      }
    })

    if (!commodity) {
      commodity = new Commodity();
      commodity.name = c.name;
      await commodityRepository.save(commodity);
    }

    let commodityMarket = undefined;
    if (market?.commodities) {
      commodityMarket = market?.commodities.filter(cm => cm.commodity === commodity)[0];
    }

    if (!commodityMarket) {
      commodityMarket = new CommodityMarket();
      commodityMarket.market = market!;
      commodityMarket.commodity = commodity;
    }
    

    commodityMarket.buy_price = c.buyPrice;
    commodityMarket.demand = c.demand;
    commodityMarket.demand_bracket = c.demandBracket === "" ? undefined : c.demandBracket;
    commodityMarket.mean_price = c.meanPrice;
    commodityMarket.sell_price = c.sellPrice;
    commodityMarket.stock = c.stock;
    commodityMarket.stock_bracket = c.stockBracket === "" ? undefined : c.stockBracket;
    commodityMarket.update_at = new Date(message.timestamp);

    await commodityMarketRepository.save(commodityMarket).catch(reason => console.log(c));
  })
}
