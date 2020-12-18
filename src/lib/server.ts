import express from "express";
import { json, urlencoded } from "body-parser";
import { Routes } from "../config/routes";

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
  }

  private config(): void {
    this.app.use(json());
    this.app.use(urlencoded({ extended: false }));
  }
}

export default new App().app;