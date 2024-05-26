import { Column, ManyToOne, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "@/database/entity/User.ts";

@Entity({ name: "programs" })
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  title: string;

  @Column("integer")
  set_count: number;

  @Column("integer")
  rest: number;

  @Column({ type: "integer", default: 0 })
  complete_count: number;

  @ManyToOne(() => User, (user) => user.programs)
  user: User;
}
