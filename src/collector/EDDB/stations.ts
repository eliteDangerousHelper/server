import { getFile } from "./common";
import { Station } from "../../entity/Station"
import { System } from "../../entity/System";
import { getRepository } from "typeorm";
import { eachLine} from "line-reader";

interface StateInterface {
  id: number,
  name: string
}

interface StationInterface {
  "id": number,
  "name": string,
  "system_id": number,
  "updated_at": number,
  "max_landing_pad_size": string,
  "distance_to_star": number,
  "government_id": number,
  "government": string,
  "allegiance_id": number,
  "allegiance": string,
  "states": StateInterface[],
  "type_id": number,
  "type": string,
  "has_blackmarket": boolean,
  "has_market": boolean,
  "has_refuel": boolean,
  "has_repair": boolean,
  "has_rearm": boolean,
  "has_outfitting": boolean,
  "has_shipyard": boolean,
  "has_docking": boolean,
  "has_commodities": boolean,
  "has_material_trader": boolean,
  "has_technology_broker": boolean,
  "has_carrier_vendor": boolean,
  "has_carrier_administration": boolean,
  "has_interstellar_factors": boolean,
  "has_universal_cartographics": boolean,
  "import_commodities": string[],
  "export_commodities": string[],
  "prohibited_commodities": string[],
  "economies": string[],
  "shipyard_updated_at": number | null,
  "outfitting_updated_at": number,
  "market_updated_at": number,
  "is_planetary": boolean,
  "selling_ships": [],
  "selling_modules": number[],
  "settlement_size_id": number | null,
  "settlement_size": number | null,
  "settlement_security_id": number | null,
  "settlement_security": number | null,
  "body_id": number | null,
  "controlling_minor_faction_id": number,
  "ed_market_id": number
}

const integrateStation = async (s: StationInterface) => {
  const stationRepository = getRepository(Station);
  const systemRepository = getRepository(System);
  let station = await stationRepository.findOne({id: s.id})

  if (!station) {
    station = new Station();
    station.id = s.id;
    station.name = s.name;

    let system = await systemRepository.findOne({eddb_id: s.system_id.toString()});

    if (!system) {
      system = new System();
      system.eddb_id = s.system_id.toString();

      systemRepository.save(system).catch((err) => {
        if (err.code !== 'ER_DUP_ENTRY') {
          throw err;
        }
      });
    }
    
    station.system = system;
    
    stationRepository.save(station).catch((err) => {
      throw err;
    });
  }
}

export const getStations = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    getFile('stations.jsonl', (file: string) => {
      console.log('stations: file retrived');
      eachLine(file, (row, last) => {
        integrateStation(JSON.parse(row));
        if (last) {
          console.log('stations: import end');
          resolve();
        }
      })
    })
  })
}
