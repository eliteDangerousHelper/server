import { eachLine } from "line-reader";
import { getRepository } from "typeorm";
import { Commodity } from "../../entity/Commodity";
import { CommodityStation } from "../../entity/CommodityStation";
import { Station } from "../../entity/Station";
import { getFile, CSVtoArray } from "./common";

interface Price {
  id: string;
  station_id: string;
  commodity_id: string;
  supply: string;
  supply_bracket: string;
  buy_price: string;
  sell_price: string;
  demand: string;
  demand_bracket: string;
  collected_at: string;
}

const lineToSystem = (line: string): Price | null => {
  const data = CSVtoArray(line);
  if (data === null || data[0] === 'id') {
    return null;
  }

  const header = [
    'id',
    'station_id',
    'commodity_id',
    'supply',
    'supply_bracket',
    'buy_price',
    'sell_price',
    'demand',
    'demand_bracket',
    'collected_at'
  ]

  const res: {[index: string]: string} = {};
  header.map((value, index) => {
    res[value] = data[index];
  });
  
  return res as unknown as Price;
}

const integratePrice = async (line: string) => {
  const p = lineToSystem(line);
  if (p == null) {
    return;
  }
  
  const stationRepository = getRepository(Station);
  const commodityStationRepository = getRepository(CommodityStation);
  const commodityRepository = getRepository(Commodity);

  let station = await stationRepository.findOne(p.station_id);
  let commodity = await commodityRepository.findOne(p.commodity_id);

  if (!station) {
    station = new Station();
    station.id = parseInt(p.station_id);
    
    stationRepository.save(station).catch((err) => {
      if (err.code !== 'ER_DUP_ENTRY') {
        throw err;
      }
    });
  }

  if (!commodity) {
    commodity = new Commodity();
    commodity.id = parseInt(p.commodity_id);
    
    commodityRepository.save(commodity).catch((err) => {
      if (err.code !== 'ER_DUP_ENTRY') {
        throw err;
      }
    });
  }

  let commodityStation = await commodityStationRepository.findOne({
    commodity,
    station
  });

  if (!commodityStation) {
    commodityStation = new CommodityStation();
    commodityStation.commodity = commodity;
    commodityStation.station = station;
    commodityStation.buy_price = parseInt(p.buy_price);
    commodityStation.demand = parseInt(p.demand);
    commodityStation.demand_bracket = parseInt(p.demand_bracket);
    commodityStation.sell_price = parseInt(p.sell_price);
    commodityStation.stock = parseInt(p.supply);
    commodityStation.stock_bracket = parseInt(p.supply_bracket);
    commodityStation.update_at = new Date(p.collected_at);
    
    commodityStationRepository.save(commodityStation).catch((err) => {
      throw err;
    });
  }
}

export const getPrices = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    getFile('listings.csv', (file: string) => {
      console.log('price: file retrived');
      eachLine(file, (line, last) => {
        integratePrice(line);
        if (last) {
          console.log('price: import end');
          resolve();
        }
      })
    });
  })
}
