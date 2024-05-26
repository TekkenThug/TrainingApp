import { DataSource } from "typeorm";
import { User } from "@/database/entity/User.ts";
import { Program } from "@/database/entity/Program.ts";
import { Token } from "@/database/entity/Token.ts";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "admin123123",
  database: "training",
  entities: [User, Program, Token],
  synchronize: true,
  logging: false,
});
