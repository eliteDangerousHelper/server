import { Application } from "express";
import { MarketController } from "../controller/market.controller";

export class Routes {
  public marketController: MarketController = new MarketController();

  public routes(app: Application): void {
    app.route("/").get(this.marketController.index);

    app.route("/market")
      .get(this.marketController.index)
    ;

    app.route("/market/:id")
      .get(this.marketController.show)
    ;
  }
}