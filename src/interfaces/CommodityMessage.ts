import Message from "./Message";

interface Commodity {
  buyPrice: number;
  demand: number;
  demandBracket: 0|1|2|3|"";
  meanPrice: number;
  name: string;
  sellPrice: number;
  stock: number;
  stockBracket: 0|1|2|3|"";
}

export interface Economy {
  name: string;
  proportion: number;
}

export default interface CommodityMessage extends Message {
  commodities: Commodity[];
  economies: Economy[];
  marketId: number;
  prohibited: string[];
  stationName: string;
  systemName: string;
}