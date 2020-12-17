import config from "./config/eddn";
import { Subscriber } from "zeromq";
import { inflateSync } from "zlib";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import "reflect-metadata";

const uri = config.protocol + "://" + config.url + ":" + config.port;

async function run() {
  const sock = new Subscriber
 
  sock.connect(uri);
  sock.subscribe("");
  console.log('Worker connected to port 9500');
 
  for await (const [msg] of sock) {
    // console.log(JSON.parse(inflateSync(msg).toString()));
  }
}

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));


run();
