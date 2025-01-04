import { Incidence } from "../../incidences/entities/incidence.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity() // Esto debe tener los paréntesis para ser correcto.
export class Comment {
    // @PrimaryGeneratedColumn()
    // id: number;

    // @ManyToOne(() => User, (user) => user.commentsUser)
    // user: User;

    // @ManyToOne(() => User, (user) => user.commentsAdmin)
    // admin: User;

    // @OneToOne(() => Incidence, (incidence) => incidence.comment)
    // @JoinColumn()
    // comment: Incidence;

    // @Column()
    // created_at: Date;
}
