import { Application } from "express";
import { NodesController } from "../controller/nodes.controller";

export class Routes {
  public nodesController: NodesController = new NodesController();

  public routes(app: Application): void {
    app.route("/").get(this.nodesController.index);

    app.route("/nodes").get(this.nodesController.index);
  }
}