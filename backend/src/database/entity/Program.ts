import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
