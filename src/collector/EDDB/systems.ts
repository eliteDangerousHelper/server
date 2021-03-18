import { getRepository } from "typeorm";
import { System } from "../../entity/System";
import { eachLine } from "line-reader";
import { getFile } from "./common";

interface SystemInterface {
  id: string;
  edsm_id: string;
  name: string;
  x: string;
  y: string;
  z: string;
  population: string;
  is_populated: string;
  government_id: string;
  government: string;
  allegiance_id: string;
  allegiance: string;
  security_id: string;
  security: string;
  primary_economy_id: string;
  primary_economy: string;
  power: string;
  power_state: string;
  power_state_id: string;
  needs_permit: string;
  updated_at: string;
  simbad_ref: string;
  controlling_minor_faction_id: string;
  controlling_minor_faction: string;
  reserve_type_id: string;
  reserve_type: string;
  ed_system_address: string;
}

const integrateSystem = async (s: SystemInterface) => {
  const systemRepository = getRepository(System);
  let system = await systemRepository.findOne({eddb_id: s.id}).catch(err => console.log('Erreur de recherche'));

  if (!system) {
    system = new System();
    system.eddb_id = s.id;
  }
  system.edsm_id = s.edsm_id;
  system.position_x = parseFloat(s.x);
  system.position_y = parseFloat(s.y);
  system.position_z = parseFloat(s.z);
  system.name = s.name;

  systemRepository.save(system).catch((err) => console.log('Erreur de sauvegarde pour le system : ', s, err));
}

export const getSystems = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    getFile('systems_populated.jsonl', (file: string) => {
      console.log('systems: file retrive');
      eachLine(file, (line, last) => {
        integrateSystem(JSON.parse(line));
        if (last) {
          console.log('systems: import end');
          resolve();
        }
      })
    })
  })
}