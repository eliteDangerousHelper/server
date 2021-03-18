import { createConnection } from "typeorm";
import eddb from "./collector/EDDB";
import "reflect-metadata";


createConnection().then((connection) => {
  connection.synchronize().then(() => {
    eddb.getSystems().then(() => {
      eddb.getStations().then(() => {
        eddb.getPrices();
      });
    });
  })
}).catch(error => console.log(error));