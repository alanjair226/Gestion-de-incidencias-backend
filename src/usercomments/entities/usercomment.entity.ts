import { Incidence } from "../../incidences/entities/incidence.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usercomment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @OneToOne(() => Incidence)
    @JoinColumn()
    incidence: Incidence;

    @Column({
        type: "varchar",
        length: 1000,
    })
    comment: string;

    @Column()
    created_at: Date;
}
