import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Length } from "class-validator";
import { Thread } from "./Thread";
import { ThreadItem } from "./ThreadItem";
import { ThreadPoint } from "./ThreadPoint";
import { ThreadItemPoint } from "./ThreadItemPoint";
import { Auditable } from "./Auditable";


@Entity({ name: "Users" })
export class User extends Auditable {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" })
    id!: string;

  @Column("varchar", {
        name: "Email",
        length: 120,
        unique: true,
        nullable: false,
    })
    email!: string;

  @Column("varchar", {
        name: "UserName",
        length: 60,
        unique: true,
        nullable: false,
    })
    userName!: string;

  @Column("varchar", { name: "Password", length: 100, nullable: false })
    @Length(8, 100)
    password!: string;

  @Column("boolean", { name: "Confirmed", default: false, nullable: false })
    confirmed: boolean = false;

  @Column("boolean", { name: "IsDisabled", default: false, nullable: false })
    isDisabled: boolean = false;

  @OneToMany(() => Thread, (thread) => thread.user)
    threads!: Thread[];

  @OneToMany(() => ThreadItem, (threadItem) => threadItem.user)
    threadItems!: ThreadItem[];

  @OneToMany(() => ThreadPoint, (threadPoint) => threadPoint.user)
    threadPoints!: ThreadPoint[];

  @OneToMany(() => ThreadItemPoint, (threadItemPoint) => threadItemPoint.user)
    threadItemPoints!: ThreadItemPoint[];
}