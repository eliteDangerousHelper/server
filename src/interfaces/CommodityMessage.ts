import Message from "./Message";

interface Commodity {
  buyPrice: number;
  demand: number;
  demandBracket: number;
  meanPrice: number;
  name: string;
  sellPrice: number;
  stock: number;
  stockBracket: number;
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