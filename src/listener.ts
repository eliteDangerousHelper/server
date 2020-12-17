import config from "./config/eddn";
import { Subscriber } from "zeromq";
import { inflateSync } from "zlib";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import "reflect-metadata";
import { dispatch } from "./collector/dispacher";

const uri = config.protocol + "://" + config.url + ":" + config.port;

async function run() {
  const sock = new Subscriber
 
  sock.connect(uri);
  sock.subscribe("");
  console.log('Worker connected to port 9500');
 
  for await (const [msg] of sock) {
    dispatch(JSON.parse(inflateSync(msg).toString()));
  }
}

createConnection().then(async connection => {
  console.log("Connected");
  
  run();
}).catch(error => console.log(error));


