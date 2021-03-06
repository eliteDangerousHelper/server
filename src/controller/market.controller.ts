import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Market } from "../entity/Market";

export class MarketController {
  public async index(req: Request, res: Response) {
    const marketRepository = getRepository(Market);

    await marketRepository.find({
      select: ["external_id"]
    }).then(markets => {
      res.json(markets);
    })
  }

  public show(req: Request, res: Response) {
    const marketId: string = req.params.id;
    const marketRepository = getRepository(Market);

    marketRepository.findOne({
      where: {
        external_id: marketId
      },
      relations: ["commodities", "prohibited", "station", "station.system"]
    }).then((market: Market | undefined) => {
      if (market) {
        res.json(market);
      } else {
        res.status(404).json({ errors: ["market not found"] });
      }
    }).catch((err: Error) => res.status(500).json(err));
  }
}