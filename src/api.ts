import app from "./lib/server";
import {createConnection} from "typeorm";
import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.API_PORT || 3000;

createConnection().then(() => {
  console.log("Connected");
  
  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
}).catch(error => console.log(error));
