import { Column, OneToOne, JoinColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "@/database/entity/User.ts";
import { TokenTypes } from "@/configs/tokens.ts";

@Entity({ name: "tokens" })
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column("varchar")
  token: string;

  @Column({ type: "enum", enum: TokenTypes })
  type: TokenTypes;

  @Column("bigint")
  expires: number;
}
