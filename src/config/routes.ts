import { Application } from "express";
import { MarketController } from "../controller/market.controller";
import { StationController } from "../controller/station.controller";
import { SystemController } from "../controller/system.controller";

export class Routes {
  public marketController: MarketController = new MarketController();
  public systemController: SystemController = new SystemController();
  public stationController: StationController = new StationController();

  public routes(app: Application): void {
    app.route("/").get(this.marketController.index);

    app.route("/market")
      .get(this.marketController.index)
    ;

    app.route("/market/:id")
      .get(this.marketController.show)
    ;

    app.route("/station/:id/getPrices")
      .get(this.stationController.getPrices)

    app.route("/system")
      .get(this.systemController.index)
    ;
  }
}