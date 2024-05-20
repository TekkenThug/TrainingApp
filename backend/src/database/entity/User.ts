import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    first_name: string;

    @Column("varchar")
    last_name: string;

    @Column("date")
    birth_date: string;
}