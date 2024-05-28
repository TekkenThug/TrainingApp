import { DataSource } from "typeorm";
import config from "@/configs/config";
import { User } from "@/database/entity/User";
import { Program } from "@/database/entity/Program";
import { Token } from "@/database/entity/Token";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.name,
  entities: [User, Program, Token],
  synchronize: true,
  logging: false,
});
