import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SystemRepository } from "../repository/SystemRepository";

export class SystemController {
  public async index(req: Request, res: Response) {
    const systemRepository = getCustomRepository(SystemRepository);
    await systemRepository.findOne({name: "Lalande 10797"}).then(system => {
      if (system === undefined) {
        res.json({error: "Not Found system"})
      } else {
        systemRepository.findByDistance(system, 20).then((systems) => {
          res.json(systems);
        })
      }
    })
  }
}
