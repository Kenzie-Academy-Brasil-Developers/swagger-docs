import { ConnectionOptions } from "typeorm";
import { User } from "../entities";

const config: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 3333,
  username: "patrick_kenzie",
  password: "10101010",
  database: "crud_node",
  entities: [User],
  synchronize: true,
  logging: false,
};

export default config;
