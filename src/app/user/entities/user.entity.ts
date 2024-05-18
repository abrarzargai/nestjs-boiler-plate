import { baseEntity } from "src/utils/baseEntity";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User extends baseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: "" })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: "admin" })
  role: string;

  @Column({ nullable: true, default: null })
  license_num: string;
}
