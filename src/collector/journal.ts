import { getRepository } from "typeorm";
import { System } from "../entity/System";
import JournalMessage from "../interfaces/JournalMessage";

export default async (message: JournalMessage) => {
  const systemRepository = getRepository(System);

  let system = await systemRepository.findOne({
    where: {
      name: message.StarSystem
    }
  });

  if (!system) {
    system = new System();
    system.name = message.StarSystem;
    system.edsm_id= message.SystemAddress.toString();
    system.position_x = message.StarPos[0];
    system.position_y = message.StarPos[1];
    system.position_z = message.StarPos[2];
    
    systemRepository.save(system).catch(() => {
      systemRepository.findOne({
        where: {
          name: message.StarSystem
        }
      }).then((s) => {
        if (!s) {
          return;
        }
        s.position_x = system!.position_x
        s.position_y = system!.position_y
        s.position_z = system!.position_z
        systemRepository.save(s)
      })  
    });
  }
}