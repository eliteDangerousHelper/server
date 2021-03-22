import { getCustomRepository, getRepository } from "typeorm";
import { System } from "../../entity/System";
import { eachLine } from "line-reader";
import { getFile } from "./common";
import { readFile } from "fs";
import { Commodity } from "../../entity/Commodity";
import { CommodityCategory } from "../../entity/CommodityCategory";
import { CommodityRepository } from "../../repository/CommodityRepository";

interface CategoryInterface {
  id: number;
  name: string;
}

interface CommodityInterface {
  id:	number;
  name:	string;
  category_id: number;
  average_price: number;
  is_rare: boolean;
  max_buy_price: number;
  max_sell_price: number;
  min_buy_price: number;
  min_sell_price: number;
  buy_price_lower_average: number;
  sell_price_upper_average: number;
  is_non_marketable: boolean;
  ed_id: number;
  category: CategoryInterface	;
}

const integrateCommodity = async (s: CommodityInterface) => {
  const commodityRepository = getCustomRepository(CommodityRepository);
  const categoryRepository = getRepository(CommodityCategory);
  let commodity = await commodityRepository.findOneByName(s.name).catch(err => console.log('Erreur de recherche'));

  if (!commodity) {
    commodity = new Commodity();
    commodity.id = s.id;
  }
  commodity.name = s.name;

  let category = await categoryRepository.findOne({
    name: s.category.name
  })

  if (!category) {
    category = new CommodityCategory();
    category.id = s.category.id;
    category.name = s.category.name;

    await categoryRepository.save(category).catch(async (err) => {
      if (err.code !== 'ER_DUP_ENTRY') {
        throw err;
      }
    
      category = await categoryRepository.findOne({
        name: s.category.name
      })
    });
  }

  commodity.category = category
  commodityRepository.save(commodity).catch((err) => {
    if (err.code !== 'ER_DUP_ENTRY') {
      throw err;
    }
  })
}

export const getCommodity = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    getFile('commodities.json', (file: string) => {
      console.log('commodities: file retrive');
      readFile(file, async (err, data) => {
        const commodities = JSON.parse(data.toString()) as CommodityInterface[];

        for (const c of commodities) {
          integrateCommodity(c);
        }

        console.log('commodities: import end');
        resolve();
      })
    })
  })
}