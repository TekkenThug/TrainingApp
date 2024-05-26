import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Program } from "@/database/entity/Program.ts";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  email: string;

  @Column("varchar")
  password: string;

  @OneToMany(() => Program, (program) => program.user)
  programs: Program[];
}
