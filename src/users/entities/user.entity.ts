import { Incidence } from "src/incidences/entities/incidence.entity";
import { Role } from "../../common/enum/rol.enum";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "../../comments/entities/comment.entity";
import { UserTrimesterScore } from "../../user_trimester_scores/entities/user_trimester_score.entity";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ nullable: false, select: false })
    password: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ type: 'enum', default: Role.USER, enum: Role })
    role: string;

    @DeleteDateColumn()
    deletedAt: Date;

    // @OneToMany(() => Incidence, (incidence) => incidence.assigned_to)
    // assignedIncidences: Incidence[];

    // @OneToMany(() => Incidence, (incidence) => incidence.created_by)
    // createdIncidences: Incidence[];

    // @OneToMany(() => Comment, (comment) => comment.user)
    // commentsUser: Comment[];

    // @OneToMany(() => Comment, (comment) => comment.admin)
    // commentsAdmin: Comment[];

    @OneToMany(() => UserTrimesterScore, (score) => score.user)
    scores: UserTrimesterScore[];
}
